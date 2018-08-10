const express = require('express')

const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy
const {
  check
} = require('express-validator/check')


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({
    'email': email
  }, (err, user) => {
    if (err) throw err
    if (!user) {
      return done(null, false, {
        message: 'Unknown email.'
      })
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, {
          message: 'Invalid Password'
        })
      }
    })
  })
}))


passport.serializeUser(function (user, done) {
  const userSession = {
    id: user._id,
    username: user.username,
    gender: user.gender,
  }
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user)
  })
})







router.get('/', (req, res) => {

  res.render('login', {
    errors: new Array(),
  })
})

router.post('/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), (req, res) => {
    // req.session.save((err) => {
    //   if (err) {
    //     throw err
    //   }
    // })
    user = req.user
    req.login(user, function (err) {
      if (err) {
        throw err;
      }
      req.flash('success', `Wellcome back ${user.username}`)
      return res.redirect('/profile/' + user.username)
    })
  })

router.get('/logout', (req, res, next) => {
  user = req.user
  if (req.session) {
    // delete session object
    req.session.destroy(err => {
      if (err) {
        return next(err)
      } else {
        req.logout()
        return res.redirect('/')
      }
    })
  }

})



















// Register <-------------------

router.post('/register', [
  check('email').custom(value => {
    return User.findOne({
      email: value
    }).then(user => {
      if (user) return Promise.reject('email already in use')
    })
  })
], (req, res) => {

  // check
  req.checkBody('email', 'This is not a valid e mail').isEmail()


  req.checkBody('username', 'your username should be more than 6 characters').isLength({
    min: 3
  })
  req.checkBody('password', 'The password should be more than 6 characters').isLength({
    min: 6
  })
  req.checkBody('password2', 'Passwords do not not match').equals(req.body.password)

  let errors = req.validationErrors()

  if (errors) {
    return res.render('register.pug', {
      errors
    })
  } else {
    let user = new User()
    user.username = req.body.username
    user.email = req.body.email
    user.gender = req.body.gender
    user.password = req.body.password
    user.save(err => {
      if (err) {
        throw err
      } else {
        req.login(user, (err) => {
          if (err) {
            throw err
          } else {
            req.flash('success', `Wellcome ${user.username}`)
            return res.redirect(`/profile/${user.username}`)
          }
        })
      }
    })
  }
})

router.get('/register', (req, res) => {
  res.render('register.pug', {
    locals: {
      errors: new Array()
    }
  })
})









module.exports = router
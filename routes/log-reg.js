const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')
const {
  check
} = require('express-validator/check')





passport.use(new LocalStrategy(
  function (email, password, done) {
    User.getUserByEmail({
      email
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown email.'
        });
      }
      User.comparePassword(myPlaintextPassword, user.password, function (err, res) {
        if (err) throw err
        if (res) {
          return done(null, user)
        } else {
          return done(null, false, {
            message: 'Invalid Password'
          })
        }
      })

    });
  }
));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});



router.get('/', (req, res) => {

  res.render('login', {
    errors: new Array(),
  })
})

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }), (res, req) => {
    res.redirect('/')
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
      if (err) throw err
      else
        req.flash('success', 'You are now registered')
      return res.redirect('/')
    })
  }
})

router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/')
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
const express = require('express')
const passport = require('passport')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')

function findInDB(type, parameter) {
  User.findOne({
    type: parameter
  }, (err, resault) => {
    if (err) throw err
    else console.log(resault)
  })
}

router.get('/', (req, res) => {

  res.render('login', {
    locals: {
      errors: new Array(),
      display: 'block'
    }
  })
})

router.post('/', (req, res) => {
  console.log(req.session)
  res.render('login', {
    locals: {
      errors: new Array(),
      display: 'block'
    }
  })
})

router.post('/register', (req, res) => {
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
  User.findOne({
    'email': req.body.email
  }, (err, user) => {
    if (err) {
      throw err
    } else {

      let error = {
        location: 'body',
        param: 'email',
        msg: 'email is already in use',
        value: req.body.email
      }
      errors.push(error)
    }
  })
  const display = '"display:block;"'
  if (errors) {
    return res.render('register', {
      locals: {
        errors,
        display
      }
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
        req.flash('all Done')
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
  res.render('register', {
    locals: {
      errors: new Array()
    }
  })
})

module.exports = router
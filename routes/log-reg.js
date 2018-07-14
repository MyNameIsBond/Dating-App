const express = require('express')
const passport = require('passport')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')



router.get('/', (req, res) => {
  console.log(req.session)
  res.render('login')
})

router.post('/', (req, res) => {
  console.log(req.session)
  res.render('login')
})

router.post('/register', (req, res) => {
  console.log('hello from the other side.')
  // check

  req.checkBody('email', 'This is not a valid e mail').isEmail()

  req.checkBody('username', 'your username must be more than 6 characters').isLength({
    min: 6
  })
  req.checkBody('password', 'The password should be more than 6 characters').isLength({
    min: 6
  })
  req.checkBody('password2', 'Passwords Does not match').equals(req.body.password)

  let errors = req.validationErrors()
  console.log(errors)
  if (errors) {
    console.log(errors)
    res.sendFile(`${process.env.PWD}/templates/flash_messages.html`, {
      errors: errors
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

module.exports = router
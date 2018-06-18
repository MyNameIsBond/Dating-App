const express = require('express')
const passport = require('passport');
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/users')
const mongoose = require('mongoose')


router.get('/', (req, res) => {
    res.render('login')
})

router.post('/register', (req, res) => {
    console.log('hey from the other side.')
    let user = new User()
    user.username = req.body.username
    user.password = req.body.password
    user.email = req.body.email
    user.gender = req.body.gender
    user.save(err => {
        if (err) throw err
        else return res.redirect('/')
    })
});




module.exports = router
var express = require('express')
var router = express.Router()
const path = require('path')


router.get('/asd', (req, res) => {
    res.send('hey')
})


router.get('/:username', (req, res) => {
    res.render('profile.pug')
})


module.exports = router
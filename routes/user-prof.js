var express = require('express')
var router = express.Router()
const path = require('path')


router.get('/kwlos', (req, res) => {
    res.send('hey')
})


router.get('/:username', (req, res) => {
    res.sendFile(`${process.env.PWD}/templates/profile.html`)
})


module.exports = router
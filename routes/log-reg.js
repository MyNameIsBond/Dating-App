var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    console.log(req.body.username)
    console.log(req.body.password)
})

module.exports = router
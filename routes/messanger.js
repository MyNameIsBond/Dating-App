const express = require('express')
const router = express.Router()

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})


router.get('/', (req, res) => {
    res.send('hello from Messanger.')
})


router.get('/:owner/:sender', (req, res) => {

})


module.exports = router
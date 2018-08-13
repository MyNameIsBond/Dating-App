const express = require('express')
const router = express.Router()
const server = require('http').Server(express)
const io = require('socket.io')(server)



// This is the blog's back end url
// localhost:8080/blog 

router.get('/', (req, res) => {
    res.render('blog.pug')
})


router.get('/create', (req, res) => {
    res.render('blog_create.pug')
})

io.on('connect', (socket) => {
    console.log('Sockets is now on')

})




module.exports = router
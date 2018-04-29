'user strict'
const express = require('express')
const mongoose = require('mongoose')
const es6Renderer = require('express-es6-template-engine')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const port = 8080
let db = mongoose.connection
mongoose.connect('mongodb://localhost/user')
let Posts = require('./models/post')

db.on('error', err => {
  console.log(err)
})

db.once('open', () => {
  console.log('MongoDB connected')
})


app.use('/public', express.static(path.join(__dirname, 'public')))
app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.get('/login', (req, res) => {
  res.render('login')
})


app.get('/', (req, res) => {
  Posts.find({}, (err, posts) => {
    if (err)
      console.log(err)
    else
      console.log(posts)
    res.render('home', {
      locals: {
        posts
      }
    })
  })
})

app.get('/nav_bar', (req, res) => {
  res.sendFile(`${__dirname}/templates/nav_bar.html`)
})

app.get('/profile/:username', (req, res) => {
  res.sendFile(`${__dirname}/templates/profile.html`)
})

app.get('/post/:textarea', (req, res) => {
  console.log(req.params.textarea)
  let postt = new Posts()
  postt.post = req.params.textarea
  date = new Date()
  postt.date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

  postt.save(err => {
    if (err)
      console.log(err)
    else
      return res.send(postt)
  })
})


app.listen(port, () => {
  console.log(`server is on port: ${port}`)
})
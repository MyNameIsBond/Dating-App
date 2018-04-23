'user strict'

const express = require('express')
const mongoose = require('mongoose')
const es6Renderer = require('express-es6-template-engine')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const port = 8080
let db = mongoose.connection
mongoose.connect('mongodb://localhost/user')

db.on('error', err => {
  console.log(err);
})

db.once('open', () => {
  console.log('MongoDB connected');
})

let post = db('./models.userSchema')

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
  res.render('home')
})

app.get('/nav_bar', (req, res) => {
  res.sendFile(`${__dirname}/templates/nav_bar.html`)
})

app.get('/profile/:username', (req, res) => {
  res.sendFile(`${__dirname}/templates/profile.html`)
})

app.post('/post/:textarea', (req, res) => {
  console.log(req.params.textarea)
})


app.listen(port, () => {
  console.log(`server is on port: ${port}`)
})

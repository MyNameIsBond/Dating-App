'user strict'

const express = require('express')
const mongoose = require('mongoose')
const es6Renderer = require('express-es6-template-engine')
const path = require('path')
const app = express()
const port = 8080

app.use('/public', express.static(path.join(__dirname, 'public')))
app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')




app.get('/login', (req, res) => {
  res.render('login')
})


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/nav_bar', (req, res) => {
  res.sendFile(`${__dirname}/templates/nav_bar.html`)
})

app.get('/:username', (req, res) => {
    res.sendFile(`${__dirname}/templates/profile.html`)

})

app.listen(port, () => {
  console.log(`server is on port: ${port}`)
})

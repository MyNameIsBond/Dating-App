const express = require('express');
const mongoose = require('mongoose');
const app = express()

app = express()


app.get('/', (req, res) => {
  res.send('done!!')
})


app.get('/test', (req, res) => {
  res.send('hello')
})



app.get('/test/test2', (req, res) => {
  res.send('hello')
})


app.get('/test/test3', (req, res) => {
  res.send('hello')
})
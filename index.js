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
const express = require('express');
const mongoose = require('mongoose');
const module = require('module');

app = express()


app.get('/',(req,res) => {
  res.send('done!!')
})

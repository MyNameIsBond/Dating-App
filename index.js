const express = require('express');
const mongoose = require('mongoose');
const app  = express()

app = express()


app.get('/',(req,res) => {
  res.send('done!!')
})

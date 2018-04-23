const mongoose = require('mongoose')
const UserPost = mongoose.Schema({
  Post: String,
  date: Date.now,
  required: true
})

let Post = module.exports = mongoose.names()

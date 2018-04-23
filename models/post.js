const mongoose = require('mongoose')
const PostSchema = mongoose.Schema({
  post: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

let Post = module.exports = mongoose.model('Post', PostSchema)

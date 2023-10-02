const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: { type: String, required: true, },
  content: { type: String, required: true, },
  author: { type: String, required: true, },
  isPublished: { type: Boolean, required: true, },
  date: { type: Date, required: true, },
})

module.exports = mongoose.model('Post', PostSchema)

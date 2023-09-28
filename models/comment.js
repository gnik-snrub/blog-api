const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  username: { type: String, required: true, },
  timestamp: { type: Date, required: true, },
  content: { type: String, required: true, },
})

module.exports = mongoose.model('Comment', CommentSchema)

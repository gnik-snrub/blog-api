const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: { type: String, required: true, },
  content: { type: String, required: true, },
  author: { type: String, required: true, },
  isPublished: { type: Boolean, required: true, },
  date: { type: Date, required: true, },
})

PostSchema.virtual('date_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_SHORT)
})

module.exports = mongoose.model('Post', PostSchema)

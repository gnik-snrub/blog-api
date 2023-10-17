const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  username: { type: String, required: true, },
  timestamp: { type: Date, required: true, },
  content: { type: String, required: true, },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, },
})

CommentSchema.virtual('timestamp_formatted').get(function() {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
})

module.exports = mongoose.model('Comment', CommentSchema)

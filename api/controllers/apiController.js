const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

exports.readPosts = async(req, res) => {
  let allPosts = await Post.find()
  allPosts = allPosts.map(post => post.toObject({virtuals: true}))
  res.json(allPosts)
}
exports.createPost = async(req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
    isPublished: req.body.isPublished,
  })
  await newPost.save()
  res.json({id: newPost._id})
}
exports.readPost = async(req, res) => {
  const post = await Post.findById(req.params.postID)
  res.json(post.toObject({virtuals: true}))
}
exports.updatePost = async(req, res) => {
  const oldPost = await Post.findById(req.params.postID)
  const updatedPost = new Post({
    title: req.body.title || oldPost.title,
    content: req.body.content || oldPost.content,
    author: req.body.author || oldPost.author,
    isPublished: false || oldPost.isPublished,
    _id: req.params.postID
  })
  await Post.findByIdAndUpdate(req.params.postID, updatedPost)
  res.send(updatedPost)
}
exports.deletePost = async(req, res) => {
  await Post.findByIdAndDelete(req.params.postID)
  res.send(`${req.params.postID} has been deleted`)
}

exports.readComments = async(req, res) => {
  let allPostComments = await Comment.find({ post: req.params.postID })
  allPostComments = allPostComments.map(comment => comment.toObject({virtuals: true}))
  res.json(allPostComments)
}
exports.createComment = async(req, res) => {
  const newComment = new Comment({
    username: req.body.username,
    timestamp: new Date(),
    content: req.body.content,
    post: req.params.postID
  })
  await newComment.save()
  res.send(`${newComment} has been submitted`)
}
exports.readComment = async (req, res) => {
  const comment = await Comment.findById(req.params.commentID)
  res.json(comment)
}
exports.updateComment = async(req, res) => {
  const oldComment = await Comment.findById(req.params.commentID)
  const updatedComment = new Comment({
    username: req.body.username || oldComment.username,
    timestamp: req.body.timestamp || oldComment.timestamp,
    content: req.body.content || oldComment.content,
    post: oldComment.post,
    _id: req.params.commentID
  })
  await Comment.findByIdAndUpdate(req.params.commentID, updatedComment)
  res.send(updatedComment)
}
exports.deleteComment = async(req, res) => {
  await Comment.findByIdAndDelete(req.params.commentID)
  res.send(`${req.params.commentID} has been deleted`)
}

exports.login = async(req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    res.status(403)
  }
  const match = await bcrypt.compare(req.body.password, user.password)
  if (!match) {
    res.status(403)
  }
  const token = jwt.sign({
    username: req.body.username,
    password: user.password,
  }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
  res.json(token)
}

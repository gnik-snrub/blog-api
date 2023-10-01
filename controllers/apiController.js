const Post = require('../models/post')

exports.readPosts = async(req, res) => {
  const allPosts = await Post.find()
  res.json(allPosts)
}
exports.createPost = async(req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    isPublished: false
  })
  await newPost.save()
  res.send(`${newPost} has been submitted`)
}
exports.readPost = async(req, res) => {
  const post = await Post.findById(req.params.postID)
  res.json(post)
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

exports.createComment = async(req, res) => {}
exports.readComment = (req, res) => {}
exports.updateComment = async(req, res) => {}
exports.deleteComment = async(req, res) => {}

exports.login = async(req, res) => {}
exports.logout = async(req, res) => {}

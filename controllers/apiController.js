const Post = require('../models/post')

exports.updatePost = async(req, res) => {}
exports.deletePost = async(req, res) => {}
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
  res.send(post)
}

exports.createComment = async(req, res) => {}
exports.readComment = (req, res) => {}
exports.updateComment = async(req, res) => {}
exports.deleteComment = async(req, res) => {}

exports.login = async(req, res) => {}
exports.logout = async(req, res) => {}

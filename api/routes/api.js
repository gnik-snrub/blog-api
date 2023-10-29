const jwt = require('jsonwebtoken')

const express = require('express')
const router = express.Router()

const apiController = require('../controllers/apiController')

function verifyToken (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = verified
    next()
  } catch(err) {
    res.status(400).send('Invalid token')
  }
}

router.get('/posts', apiController.readPosts)
router.post('/posts', verifyToken, apiController.createPost)
router.get('/posts/:postID', apiController.readPost)
router.put('/posts/:postID', verifyToken, apiController.updatePost)
router.delete('/posts/:postID', verifyToken, apiController.deletePost)

router.get('/posts/:postID/comments', apiController.readComments)
router.post('/posts/:postID/comments', apiController.createComment)
router.get('/posts/:postID/comments/:commentID', apiController.readComment)
router.put('/posts/:postID/comments/:commentID', verifyToken, apiController.updateComment)
router.delete('/posts/:postID/comments/:commentID', verifyToken, apiController.deleteComment)

router.post('/login', apiController.login)

module.exports = router

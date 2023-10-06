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

router.use((req, res, next) => {
  if (req.method !== 'GET' && req.path !== '/login') {
    verifyToken(req, res, next)
  } else {
    next()
  }
})

router.get('/posts', apiController.readPosts)
router.post('/posts', apiController.createPost)
router.get('/posts/:postID', apiController.readPost)
router.put('/posts/:postID', apiController.updatePost)
router.delete('/posts/:postID', apiController.deletePost)

router.get('/posts/:postID/comments', apiController.readComments)
router.post('/posts/:postID/comments', apiController.createComment)
router.get('/posts/:postID/comments/:commentID', apiController.readComment)
router.put('/posts/:postID/comments/:commentID', apiController.updateComment)
router.delete('/posts/:postID/comments/:commentID', apiController.deleteComment)

router.post('/login', apiController.login)

module.exports = router

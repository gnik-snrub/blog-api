const express = require('express')
const router = express.Router()

const apiController = require('../controllers/apiController')

router.post('/posts', apiController.createPost)
router.get('/posts/:postID', apiController.readPost)
router.put('/posts/:postID', apiController.updatePost)
router.delete('/posts/:postID', apiController.deletePost)

router.post('/posts/:postID/comments', apiController.createComment)
router.get('/posts/:postID/comments/:commentID', apiController.readComment)
router.put('/posts/:postID/comments/:commentID', apiController.updateComment)
router.delete('/posts/:postID/comments/:commentID', apiController.deleteComment)

router.post('/login', apiController.login)
router.post('/logout', apiController.logout)

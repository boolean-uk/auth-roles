const express = require('express')
const { createPost, deletePost } = require('../controllers/post')
const { verifyToken, verifyAdmin } = require('../middleware/auth')
const {
  createPostPermission,
  deletePostPermission
} = require('../middleware/permissions')
const {
  createPostErrorHandler,
  deletePostErrorHandler
} = require('../middleware/errorsHandler')

const router = express.Router()

router.post('/', createPostErrorHandler, createPostPermission, createPost)
router.delete(
  '/:postId',
  deletePostErrorHandler,
  verifyToken,
  verifyAdmin,
  deletePostPermission,
  deletePost
)

module.exports = router

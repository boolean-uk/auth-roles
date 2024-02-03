const express = require('express')
const { createPost, deletePost } = require('../controllers/post')
const { verifyToken, verifyAdmin } = require('../middleware/auth')
const { createPostPermission } = require('../middleware/permissions')
const { createPostErrorHandler } = require('../middleware/errorsHandler')

const router = express.Router()

router.post('/', createPostErrorHandler, createPostPermission, createPost)
router.delete('/:postId', verifyToken, verifyAdmin, deletePost)

module.exports = router

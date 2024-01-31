const express = require('express')
const { createPost, deletePost } = require('../controllers/post')
const { verifyToken, verifyAdmin } = require('../middleware/auth')

const router = express.Router()

router.post('/', createPost)
router.delete('/:postId', verifyToken, verifyAdmin, deletePost)

module.exports = router

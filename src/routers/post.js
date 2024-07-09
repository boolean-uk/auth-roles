const express = require('express')
require('express-async-errors')
const { hasValidToken, checkRole } = require('../verification/verification.js')
const { createPost, deletePost } = require('../controllers/post')

const router = express.Router()

router.post('/', createPost)

router.delete('/:id', hasValidToken, checkRole, deletePost)

module.exports = router

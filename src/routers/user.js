const express = require('express')
const { getAllUsers, createUser, deleteUser } = require('../controllers/user')
const { verifyToken, verifyAdmin } = require('../middleware/auth')

const router = express.Router()

router.get('/', verifyToken, verifyAdmin, getAllUsers)

router.post('/', createUser)

router.delete('/:userId', verifyToken, verifyAdmin, deleteUser)

module.exports = router

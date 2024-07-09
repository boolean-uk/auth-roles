const express = require('express')
require('express-async-errors')
const { createUser, getUsers, deleteUser } = require('../controllers/user')

const { hasValidToken, checkRole } = require('../verification/verification.js')

const router = express.Router()

router.post('/', createUser)

router.get('/', hasValidToken, checkRole, getUsers)

router.delete('/:id', hasValidToken, checkRole, deleteUser)

module.exports = router

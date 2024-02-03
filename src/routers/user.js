const express = require('express')
const { getAllUsers, createUser, deleteUser } = require('../controllers/user')
const { verifyToken, verifyAdmin } = require('../middleware/auth')
const {
  createUserErrorHandler,
  deleteUserErrorHandler
} = require('../middleware/errorsHandler')
const { deleteUserPermission } = require('../middleware/permissions')

const router = express.Router()

router.get('/', verifyToken, verifyAdmin, getAllUsers)

router.post('/', createUserErrorHandler, createUser)

router.delete(
  '/:userId',
  deleteUserErrorHandler,
  verifyToken,
  verifyAdmin,
  deleteUserPermission,
  deleteUser
)

module.exports = router

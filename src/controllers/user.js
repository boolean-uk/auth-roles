// DB
const {
  getAllUsersDb,
  createUserDb,
  deleteUserDb
} = require('../domains/user.js')

// Error handler
const { checkUserNameExist } = require('../errors/userErrorHandler.js')

// Helpers
const { getUserById } = require('../helpers/userHelpers.js')

const getAllUsers = async (req, res) => {
  const usersList = await getAllUsersDb()

  res.status(200).json({ users: usersList })
}

const createUser = async (req, res) => {
  const { username, password } = req.body

  const createdUser = await createUserDb(username, password)

  return res.status(201).json({ user: createdUser })
}

const deleteUser = async (req, res) => {
  const { userId } = req.params

  const deletedUser = await deleteUserDb(userId)

  res.status(200).json({ user: deletedUser })
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser
}

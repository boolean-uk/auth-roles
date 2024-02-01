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

  if (!username || !password) {
    return res.status(400).json({
      error: 'Missing fields in request body'
    })
  }

  await checkUserNameExist(username)

  const createdUser = await createUserDb(username, password)

  return res.status(201).json({ user: createdUser })
}

const deleteUser = async (req, res) => {
  const { userId } = req.params

  const foundUser = await getUserById(userId)

  const deletedUser = await deleteUserDb(foundUser.id)

  res.status(200).json({ user: deletedUser })
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser
}

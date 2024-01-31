const { PrismaClientKnownRequestError } = require('@prisma/client')

// DB
const {
  getAllUsersDb,
  createUserDb,
  deleteUserDb
} = require('../domains/user.js')

// Helpers
const { getUserById } = require('../helpers/userHelpers.js')

const getAllUsers = async (req, res) => {
  try {
    const usersList = await getAllUsersDb()

    res.status(200).json({ users: usersList })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const createUser = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: 'Missing fields in request body'
    })
  }

  try {
    const createdUser = await createUserDb(username, password)

    return res.status(201).json({ user: createdUser })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A user with the provided username already exists' })
      }
    }

    res.status(error.status ?? 500).json({ error: error.message })
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.params

  try {
    const foundUser = await getUserById(userId)

    const deletedUser = await deleteUserDb(foundUser.id)

    res.status(200).json({ user: deletedUser })
  } catch (error) {
    res.status(error.status ?? 500).json({ error: error.message })
  }
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser
}

const { PrismaClientKnownRequestError } = require('@prisma/client')

// DB
const { getAllUsersDb, createUserDb } = require('../domains/user.js')

// Error Handlers
const { checkAdminUser } = require('../errors/userErrorHandler.js')

// Helpers
const { verifyUser } = require('../helpers/userHelpers.js')

const getAllUsers = async (req, res) => {
  const { authorization } = req.headers

  try {
    const verifiedUser = await verifyUser(authorization)

    checkAdminUser(verifiedUser.role)

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

    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  getAllUsers,
  createUser
}

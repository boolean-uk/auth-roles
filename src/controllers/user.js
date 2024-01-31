const { PrismaClientKnownRequestError } = require('@prisma/client')
const jwt = require('jsonwebtoken')

// DB
const {
  getAllUsersDb,
  getUserBySubDb,
  createUserDb
} = require('../domains/user.js')

// Error Handlers
const { checkAdminUser } = require('../errors/userErrorHandler.js')

const secret = process.env.JWT_SECRET

const getAllUsers = async (req, res) => {
  const { authorization } = req.headers

  try {
    const authUser = jwt.verify(authorization.split(' ')[1], secret)
    const foundUser = await getUserBySubDb(authUser.sub)

    // Error handlers
    checkAdminUser(foundUser.role)

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

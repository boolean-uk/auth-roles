const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

// DB
const { getUserBySubDb } = require('../domains/user')

// Error handler
const errorCreator = require('../errors/errorCreator')

const verifyUser = async (token) => {
  const authUser = jwt.verify(token.split(' ')[1], secret)
  const foundUser = await getUserBySubDb(authUser.sub)

  return foundUser
}

const getUserById = async (userId) => {
  const foundUser = await getUserBySubDb(userId)

  if (!foundUser) {
    throw errorCreator('User with provided id does not exist', 404)
  }

  return foundUser
}

module.exports = { verifyUser, getUserById }

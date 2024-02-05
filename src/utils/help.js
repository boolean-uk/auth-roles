const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

// DB
const { getUserBySubDb } = require('../domains/user')

const verifyUser = async (token) => {
  const authUser = jwt.verify(token.split(' ')[1], secret)
  const foundUser = await getUserBySubDb(authUser.sub)

  return foundUser
}



module.exports = { verifyUser }
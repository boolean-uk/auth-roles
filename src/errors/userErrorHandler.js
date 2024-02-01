const errorCreator = require('./errorCreator')

// DB
const { getUserByNameDb } = require('../domains/user')

const checkUserNameExist = async (username) => {
  const foundUser = await getUserByNameDb(username)

  if (foundUser) {
    throw errorCreator('User with provided username is already exist', 409)
  }

  return foundUser
}

module.exports = { checkUserNameExist }

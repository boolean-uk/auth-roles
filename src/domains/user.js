const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const getAllUsersDb = async () => {
  const users = await prisma.user.findMany()

  return users
}

const getUserBySubDb = async (sub) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      id: Number(sub)
    }
  })

  return foundUser
}

const getUserByNameDb = async (username) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      username: username
    }
  })

  return foundUser
}

const createUserDb = async (username, password) => {
  const createdUser = await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 6)
    }
  })

  return createdUser
}

const deleteUserDb = async (userId) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(userId)
    }
  })

  return deletedUser
}

module.exports = {
  getAllUsersDb,
  getUserBySubDb,
  getUserByNameDb,
  createUserDb,
  deleteUserDb
}

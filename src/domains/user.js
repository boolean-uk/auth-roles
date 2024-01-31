const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password, role = 'USER') => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6),
    role
  }
})

const getUsersDb = async () => await prisma.user.findMany({})

module.exports = {
  createUserDb,
  getUsersDb
}

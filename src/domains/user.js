const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password) => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6)
  }
})

const getUsersDb = async () => await prisma.user.findMany()

const getUserByIdDb = async (id) => await prisma.user.findUnique({ 
  where:{ 
    id 
  }
})

module.exports = {
  createUserDb, 
  getUsersDb, 
  getUserByIdDb
}

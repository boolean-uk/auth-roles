const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password, role = "USER") => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6),
    role: {
      connectOrCreate: {
        where: {
          name: role
        }, 
        create:{
          name: role
        }
      }
    }
  }, 
  include: {
    role: true
  }
})

const getUsersDb = async () => await prisma.user.findMany()

const getUserByIdDb = async (id) => await prisma.user.findUnique({ 
  where:{ 
    id 
  }, 
  include:{
    role: true
  }
})

const deleteUserDb = async (id) => await prisma.user.delete({
  where: {
    id
  }, 
  include: {
    role: true
  }
})
module.exports = {
  createUserDb, 
  getUsersDb, 
  getUserByIdDb, 
  deleteUserDb
}

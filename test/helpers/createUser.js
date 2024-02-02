const prisma = require("../../src/utils/prisma")
const bcrypt = require('bcrypt');

const createUser = async (username, password, role = 'USER') => {
  return await prisma.user.create({
    data: {
      username,
      role: {
        connectOrCreate:{
          where: {
            name: role
          }, 
          create: {
            name: role
          }
        }
      },
      passwordHash: await bcrypt.hash(password, 6)
    },
    include: {
      role: true
    }
  })
}

module.exports = {
    createUser
}

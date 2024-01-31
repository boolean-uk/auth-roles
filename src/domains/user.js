const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password) => {
  return await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 6),
      roles: {
        create: {
          role: {
            connectOrCreate: {
              create: {
                type: "USER"
              },
              where: {
                type: "USER" 
              }
            }
          }
        }
      }
    },
    include: {
      roles: {
        include: {
          role: {
            select: {
              type: true
            }
          }
        }
      }
    }
  });
}

const selectAllUsersDb = async() => {
  return await prisma.user.findMany({
    include: {
      roles: {
        include: {
          role: {
            select: {
              type: true
            }
          }
        }
      }
    }
  })
}

module.exports = {
  createUserDb,
  selectAllUsersDb
}

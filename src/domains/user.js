const { json } = require('express')
const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { deleteUser } = require('../controllers/user')

const secret = process.env.JWT_SECRET
const createUserDb = async (username, password, role) => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6),
    role
  }
})

const getAllDb = async (token) => {
  try {
    const decodedToken = jwt.verify(token, secret)
    const foundUser = await prisma.user.findFirst({ 
      where : { id : decodedToken.sub }
    })
    if(foundUser.role === 'ADMIN') {
      return await prisma.user.findMany({
        select : {
          id : true,
          username : true,
          role : true
        }
      })
    }

    else {
      throw new Error('Access Denied')
    }
   
  } catch (error) {
    throw error
  }
}

const loginDb = async(username) => {
try {
  return await prisma.user.findUnique({ 
    where : { username }
  })

} catch (error) {
  throw error
}
}

const deleteDb = async (token, id) => {
  try {
    const decodedToken = jwt.verify(token, secret)
    if(!decodedToken) {
      throw new Error('Access Denied')
    }
    const foundDemandant = await prisma.user.findFirst({
      where : { id : decodedToken.sub }
    })
    

    if(foundDemandant.role === 'ADMIN') {
      const foundUser = await prisma.user.findFirst({
        where : {
          id : id
        }
      })

      const deletedUser = await prisma.$transaction([
        prisma.post.deleteMany({
          where : {
            userId: foundUser.id
          }
        }),
        prisma.user.delete({
          where :{
            id : foundUser.id
          }
        })
      ])
      return deletedUser[1]
    } else if (foundDemandant.role === 'USER') {
      
      const foundUser = await prisma.user.findFirst({
        where : {
          id
        }
      })
      
      if(foundDemandant.id === foundUser.id) {
      
        const deletedUser = await prisma.$transaction([
          prisma.post.deleteMany({
            where : {
              userId : foundUser.id
            }
          }),
          prisma.user.delete({
            where : {
              id : foundUser.id
            }
          })
        ])

      
        return deletedUser[1]
      } else {
        throw new Error('error')
      }
    } else {
      throw new Error('Access Denied')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  createUserDb , getAllDb, loginDb, deleteDb
}

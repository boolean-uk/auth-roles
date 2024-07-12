const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const createPostDb = async (title, userId) => await prisma.post.create({
  data: {
    title,
    user: {
      connect: {
        id: userId
      }
    }
  }
})

const deletePostDb = async(token, id) => {
  console.log('the id is : ', id)
  console.log('the token is : ', token)

  const decodedToken = jwt.verify(token, secret)
  if(!decodedToken) {
    throw new Error('Access Denied: Invalid token')
  }

  
  const foundPostInfo = await prisma.post.findFirst({
    where : {
      id : id
    }
  })

  const foundDemantant = await prisma.user.findFirst({
    where : {
      id : decodedToken.sub
    }
  })

  if(!foundDemantant) {
    throw new Error('Demantant Not found')
  }

  if(foundDemantant.role === 'ADMIN'){

    return await prisma.post.delete({
      where : {
        id
      }
    })
  } else if(foundDemantant.role === 'USER') {
    if(foundPostInfo.userId !== foundDemantant.id) {
      throw new Error('Access Denied: you can only delete your posts.')
    } else {
      return await prisma.post.delete({
        where : {
          id
        }
      })
    }
  } else {
    throw new Error('Something went wront at Database')
  }
}

module.exports = {
  createPostDb, deletePostDb
}

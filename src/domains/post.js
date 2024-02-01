const prisma = require('../utils/prisma')

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

const deletePostDb = async (id) => 
  await prisma.post.delete({
    where: {
      id
    }
  })

  
const getPostByDb = async (id) => 
await prisma.post.findUnique({
  where: {
    id
  }, 
  include: {
    user: true
  }
})

module.exports = {
  createPostDb,
  deletePostDb, 
  getPostByDb
}

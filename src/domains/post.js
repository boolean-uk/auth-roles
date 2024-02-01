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

const findPostDb = async (id) => await prisma.post.findUnique({
  where: {
    id
  }
})

const deletePostsDb = async (id) => await prisma.post.delete({
  where: {
    id
  }
})

module.exports = {
  createPostDb,
  findPostDb,
  deletePostsDb
}

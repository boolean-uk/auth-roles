const prisma = require('../utils/prisma')

const getPostByIdDb = async (postId) => {
  const foundPost = await prisma.post.findFirst({
    where: {
      id: Number(postId)
    }
  })

  return foundPost
}

const getPostByTitleDb = async (title) => {
  const foundPost = await prisma.post.findFirst({
    where: {
      title: title
    }
  })

  return foundPost
}

const createPostDb = async (title, userId) => {
  const createdPost = await prisma.post.create({
    data: {
      title,
      user: {
        connect: {
          id: userId
        }
      }
    }
  })

  return createdPost
}

const deletePostDb = async (postId) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id: Number(postId)
    }
  })

  return deletedPost
}

module.exports = {
  getPostByIdDb,
  getPostByTitleDb,
  createPostDb,
  deletePostDb
}

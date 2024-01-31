// DB
const { getPostByIdDb } = require('../domains/post')

// Error handler
const errorCreator = require('../errors/errorCreator')

const getPostById = async (postId) => {
  const foundPost = await getPostByIdDb(postId)

  if (!foundPost) {
    throw errorCreator('Post with provided if does not exist', 404)
  }

  return foundPost
}

module.exports = { getPostById }

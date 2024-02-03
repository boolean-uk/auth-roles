const errorCreator = require('./errorCreator')

// DB
const { getPostByTitleDb } = require('../domains/post')

const checkPostTitleExist = async (title) => {
  const foundPost = await getPostByTitleDb(title)

  if (foundPost) {
    throw errorCreator('Post with provided title is already exist', 409)
  }

  return foundPost
}

module.exports = { checkPostTitleExist }

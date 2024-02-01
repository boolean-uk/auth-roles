// DB
const { createPostDb, deletePostDb } = require('../domains/post.js')
const { getUserBySubDb } = require('../domains/user.js')

// Helpers
const { getPostById } = require('../helpers/postHelpers.js')

// Error handlers
const { checkPostTitleExist } = require('../errors/postErrorHandler.js')
const errorCreator = require('../errors/errorCreator.js')

const createPost = async (req, res) => {
  const { title, userId } = req.body

  if (!title || !userId) {
    throw errorCreator('Missing fields in request body', 400)
  }

  const foundUser = await getUserBySubDb(userId)

  if (!foundUser) {
    throw errorCreator('The user with provided userId does not exist', 409)
  }

  await checkPostTitleExist(title)

  const createdPost = await createPostDb(title, foundUser.id)

  return res.status(201).json({ post: createdPost })
}

const deletePost = async (req, res) => {
  const { postId } = req.params

  const foundPost = await getPostById(postId)

  const deletedPost = await deletePostDb(foundPost.id)

  res.status(200).json({ post: deletedPost })
}

module.exports = {
  createPost,
  deletePost
}

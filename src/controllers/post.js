// DB
const { createPostDb, deletePostDb } = require('../domains/post.js')
const { getUserBySubDb } = require('../domains/user.js')

// Helpers
const { getPostById } = require('../helpers/postHelpers.js')

const createPost = async (req, res) => {
  const { title } = req.body
  const { user } = req

  const createdPost = await createPostDb(title, user.id)

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

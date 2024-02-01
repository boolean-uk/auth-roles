const { createPostDb, deletePostsDb } = require('../domains/post.js')
const messages = require('../errorMessages.js')

const createPost = async (req, res) => {
  const {
    title,
    userId
  } = req.body

  if (!title || !userId) {
    return res.status(400).json({
      error: messages.missingFields
    })
  }

  const createdPost = await createPostDb(title, userId)

  return res.status(201).json({ post: createdPost })
}

const deletePosts = async (req, res) => {
  const postId = Number(req.params.postId)

  const postToDelete = await deletePostsDb(postId)

  res.status(200).json({
    post: postToDelete,
    title: postToDelete.title
  })
}

module.exports = {
  createPost,
  deletePosts
}

const errorCreator = require('../errors/errorCreator')
const { checkPostTitleExist } = require('../errors/postErrorHandler')
const { checkUserNameExist } = require('../errors/userErrorHandler')
const { getPostById } = require('../helpers/postHelpers')
const { getUserById } = require('../helpers/userHelpers')

const createPostErrorHandler = async (req, res, next) => {
  const { title, userId } = req.body

  if (!title || !userId) {
    throw errorCreator('Missing fields in request body', 400)
  }

  const foundUser = await getUserById(userId)

  await checkPostTitleExist(title)

  req.user = foundUser

  next()
}

const deletePostErrorHandler = async (req, res, next) => {
  const { postId } = req.params

  const foundPost = await getPostById(postId)

  req.post = foundPost

  next()
}

const createUserErrorHandler = async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw errorCreator('Missing fields in request body', 400)
  }

  await checkUserNameExist(username)

  next()
}

const deleteUserErrorHandler = async (req, res, next) => {
  const { userId } = req.params

  await getUserById(userId)

  next()
}

module.exports = {
  createPostErrorHandler,
  deletePostErrorHandler,
  createUserErrorHandler,
  deleteUserErrorHandler
}

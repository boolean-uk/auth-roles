// Error handlers
const errorCreator = require('../errors/errorCreator')

// DB
const { getPostByIdDb } = require('../domains/post')

// Helpers
const { verifyUser } = require('../helpers/userHelpers')

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers

  const verifiedUser = await verifyUser(authorization)

  delete verifiedUser.passwordHash

  req.user = verifiedUser

  next()
}

const verifyAdmin = async (req, res, next) => {
  const { userId, postId } = req.params

  if (userId) {
    if (Number(req.user.id) === Number(userId)) {
      return next()
    }
  }

  if (postId) {
    const foundPost = await getPostByIdDb(postId)

    if (Number(req.user.id) === Number(foundPost.userId)) {
      return next()
    }
  }

  if (!req.user) {
    throw errorCreator('Unauthorized', 401)
  }

  if (req.user.role !== 'ADMIN') {
    throw errorCreator('Forbidden', 403)
  }

  next()
}

module.exports = { verifyToken, verifyAdmin }

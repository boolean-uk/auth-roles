// Error handlers
const errorCreator = require('../errors/errorCreator')

// DB
const { getPostByIdDb } = require('../domains/post')

// Helpers
const { verifyUser } = require('../helpers/userHelpers')

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers

  try {
    const verifiedUser = await verifyUser(authorization)

    delete verifiedUser.passwordHash

    req.user = verifiedUser

    next()
  } catch (error) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }
}

const verifyAdmin = async (req, res, next) => {
  const { userId, postId } = req.params

  try {
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
  } catch (error) {
    return res.status(error.status ?? 403).json({ error: error.message })
  }
}

module.exports = { verifyToken, verifyAdmin }

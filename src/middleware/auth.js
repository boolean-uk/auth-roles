// Error handlers
const errorCreator = require('../errors/errorCreator')

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

const verifyAdmin = (req, res, next) => {
  const { userId } = req.params

  try {
    if (!req.user) {
      throw errorCreator('Unauthorized', 401)
    }

    if (req.user.role !== 'ADMIN' && Number(req.user.id) !== Number(userId)) {
      throw errorCreator('Forbidden', 403)
    }

    next()
  } catch (error) {
    return res.status(error.status ?? 403).json({ error: error.message })
  }
}

module.exports = { verifyToken, verifyAdmin }

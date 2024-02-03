const errorCreator = require('../errors/errorCreator')

const createPostPermission = async (req, res, next) => {
  const { user } = req

  if (!user.permissions.includes('CREATE_POSTS')) {
    throw errorCreator('You do not have permission to create new post', 403)
  }

  next()
}

module.exports = { createPostPermission }

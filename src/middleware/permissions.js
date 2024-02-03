const errorCreator = require('../errors/errorCreator')

const createPostPermission = async (req, res, next) => {
  const { user } = req

  if (!user.permissions.includes('CREATE_POSTS')) {
    throw errorCreator('You do not have permission to create new post', 403)
  }

  next()
}

const deletePostPermission = async (req, res, next) => {
  const { user } = req

  if (
    !user.permissions.includes('DELETE_ANY_POST') &&
    !user.permissions.includes('DELETE_MY_POST')
  ) {
    throw errorCreator('You do not have permission to delete a post', 403)
  }

  next()
}

const deleteUserPermission = async (req, res, next) => {
  const { user } = req

  if (
    !user.permissions.includes('DELETE_ANY_USER') &&
    !user.permissions.includes('DELETE_MY_USER')
  ) {
    throw errorCreator('You do not have permission to delete a post', 403)
  }

  next()
}

module.exports = {
  createPostPermission,
  deletePostPermission,
  deleteUserPermission
}

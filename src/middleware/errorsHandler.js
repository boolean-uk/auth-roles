const errorCreator = require('../errors/errorCreator')
const { checkPostTitleExist } = require('../errors/postErrorHandler')
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

module.exports = { createPostErrorHandler }

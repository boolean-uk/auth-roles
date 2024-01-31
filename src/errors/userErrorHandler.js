const errorCreator = require('./errorCreator')

const checkAdminUser = (role) => {
  if (role !== 'ADMIN') {
    throw errorCreator('Your role must be an Admin', 403)
  }

  return true
}

module.exports = {
  checkAdminUser
}

const errorCreator = require('./error.js')

const checkAdminUser = (role) => {
  if (role !== 'ADMIN') {
    throw errorCreator('Your role must be an Admin', 403)
  }

  
  return true
}


module.exports = {
  checkAdminUser
}
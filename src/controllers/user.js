const { createUserDb, getUsersDb } = require('../domains/user.js')

const createUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    throw new Error ("missing input")
  }
    const createdUser = await createUserDb(username, password)
    return res.status(201).json({ user: createdUser })
}

const getUsers = async (req, res) => {
  const users = await getUsersDb()
  res.json({ users })
}

module.exports = {
  createUser, 
  getUsers
}

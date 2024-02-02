const { createUserDb, getUsersDb, deleteUserDb } = require('../domains/user.js')

const createUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    throw new Error ("missing input")
  }
    const createdUser = await createUserDb(username, password)
    delete createdUser.password
    return res.status(201).json({ user: createdUser })
}

const getUsers = async (req, res) => {
  const usersWithPasswords = await getUsersDb()
  const users = usersWithPasswords.map(user => {
    delete user.password
  })
  res.json({ users })
}

const deleteUser = async (req,res) => {
  const id = Number(req.params.id)
  const user = await deleteUserDb(id)
  delete user.password
  res.json({ user })
}

module.exports = {
  createUser, 
  getUsers, 
  deleteUser
}

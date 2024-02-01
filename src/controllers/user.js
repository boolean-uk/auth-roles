const { createUserDb, getUsersDb } = require('../domains/user.js')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const createUser = async (req, res) => {
  const {
    username,
    password,
    role = 'USER'
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  if (role !== 'ADMIN' && role !== 'USER') {
    return res.status(400).json({ 
      error: "Valid roles are 'USER' or 'ADMIN'"
    })
  }

    const createdUser = await createUserDb(username, password, role)
    const token = jwt.sign({ sub: createdUser.id }, secret)
    return res.status(201).json({ user: createdUser, token })
}

const getUsers = async (req, res) => {
  const users = await getUsersDb()
  res.status(200).json({ users })
}

module.exports = {
  createUser,
  getUsers
}

const { PrismaClientKnownRequestError } = require("@prisma/client")
const bcrypt = require('bcrypt')
const { createUserDb, getAllDb, loginDb, deleteDb } = require('../domains/user.js')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const createUser = async (req, res) => {
  const {
    username,
    password,
    role
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  try {
    const createdUser = await createUserDb(username, password, role)

    return res.status(201).json({ user: createdUser })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A user with the provided username already exists" })
      }
    }

    res.status(500).json({ error: e.message })
  }
}

const getAllUsers = async (req, res) => {
  const [_, token] = req.headers['authorization'].split(' ')

  try {
    const users = await getAllDb(token)

  res.status(200).json({users})
  
  } catch (error) {
    res.status(403).json({error : 'Invalid credentials'})
  }
}

const login = async (req, res) => {
  const {username, password} = req.body

  const existUser = await loginDb(username)

  if(!existUser) {
    return res.status(401).json({error : 'Invalid username or password'})
  }
  try {
    const passwordMatch = await bcrypt.compare(password, existUser.passwordHash)

    if(!passwordMatch) {
      console.log('password')
      return res.status(401).json({error : 'Invalid username or password'})
    }
    
    const token = jwt.sign({sub : existUser.id}, secret)
    return res.status(200).json({token})

  } catch (e) {
    return res.status(500).json({error : 'An error occured duiting login!'})
  }
}

const deleteUser = async (req, res) => {
  const id = Number(req.params.id)
  
  try {
    const [_, token ] = req.headers.authorization.split(' ')

    const deletedUser = await deleteDb(token, id)

    return res.status(200).json({user : deletedUser})
  } catch (error) {
    return res.status(403).json({ error: error || 'Something went wrong' })
  }

}

module.exports = {
  createUser , getAllUsers , login, deleteUser
}

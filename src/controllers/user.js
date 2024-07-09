const { PrismaClientKnownRequestError } = require('@prisma/client')
const {
    createUserDb,
    getUserDb,
    getAllUsersDb,
    deleteUserDb,
} = require('../domains/user.js')
const prisma = require('../utils/prisma.js')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        })
    }

    try {
        const createdUser = await createUserDb(username, password)
        delete createdUser.passwordHash

        return res.status(201).json({ user: createdUser })
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.status(409).json({
                    error: 'A user with the provided username already exists',
                })
            }
        }

        res.status(500).json({ error: e.message })
    }
}

const getUsers = async (req, res) => {
    if (req.isAdmin) {
        const users = await getAllUsersDb()
        return res.json({ users: users })
    }
    return res
        .status(403)
        .json({ error: 'Cannot access resource, no permission' })
}

const deleteUser = async (req, res) => {
  const parsedId = Number(req.params.id)
  if(isNaN(parsedId)){
    return res.status(400).json({error:'User ID is invalid'})
  }
  const isSelfDelete = parsedId === req.userInformation.id
    const isAdmin = req.isAdmin
    if (isSelfDelete || isAdmin) {
        const deletedUser = await deleteUserDb(parsedId)
        delete deletedUser.passwordHash
        return res.json({ user: deletedUser })
    }
    return res.status(403).json({ error: 'Cannot delete user, no permission' })
}

module.exports = {
    createUser,
    getUsers,
    deleteUser,
}

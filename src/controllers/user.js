const { PrismaClientKnownRequestError } = require("@prisma/client")
const  {PrismaClient} = require( "@prisma/client");
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

const secret = process.env.JWT_SECRET;


const { createUserDb } = require('../domains/user.js')

const createUser = async (req, res) => {
  const {
    username,
    password,
    role = "USER"
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

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const founderUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!founderUser) {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }
 
    const checkFounderPassword = await bcrypt.compare(password, founderUser.passwordHash);

    if (!checkFounderPassword) {
      return res.status(401).json({ error: 'Invalid Username or Password' });
    }

    const createToken = (payload, secret) => {
      const result = jwt.sign(payload, secret);
      return result;
    };

    const token = createToken({ username: founderUser.username }, secret);

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error',details : error.message });
  }
};


const getAllUser = async (req, res)=>{

  try{
    const allUsers = await prisma.user.findMany();
    res.status(200).json({users: allUsers})
  }catch(error){
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: 'Internal Server Error',details : error.message });
  }
 
}

const deleteUser = async (req, res) => {
  const deletedUserId = Number(req.params.id);

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: deletedUserId,
      },
    });

    console.log("This is the user to be deleted:", deletedUser);

    res.status(200).json({ deletedUser });
  } catch (error) {
    return res.status(403).json({ error: 'Internal Server Error',details : error.message });

  /*   console.error("Error deleting user:", error);
    res.status(403).json({ message: "Unable to delete user" }); */
  }
};


module.exports = {
  createUser,
  loginUser,
  getAllUser,
  deleteUser
}

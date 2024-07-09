const express = require("express");
const { createUser, getUsers, deleteUser } = require("../controllers/user");
const { verifyAdminRole, verifyToken }  = require('../middleware/auth.js')

const router = express.Router();

router.post("/",  createUser);

router.get("/",verifyToken, verifyAdminRole, getUsers );

router.delete("/:id", verifyToken, verifyAdminRole, deleteUser)

module.exports = router;

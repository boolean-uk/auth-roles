const express = require("express");
const { createUser, getUsers } = require("../controllers/user");
const { verifyAdminRole, verifyToken }  = require('../middleware/auth.js')

const router = express.Router();

router.post("/",  createUser);

router.get("/",verifyToken, verifyAdminRole, getUsers );

module.exports = router;

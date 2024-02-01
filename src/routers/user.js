const express = require("express");
const { createUser, getUser, deleteUser } = require("../controllers/user");


const router = express.Router();

router.post("/", createUser);
router.get("/",  getUser);
router.delete("/:userId",  deleteUser); // Assuming checkAdminUser is your admin check middleware

module.exports = router;

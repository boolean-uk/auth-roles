const express = require("express");
const {
  createUser
} = require('../controllers/user');

const router = express.Router();

router.post("/", createUser);
router.get("/", (req, res) => {console.log("Hello I am a console log", req.headers.authorization)})

module.exports = router;

const express = require("express");
const {
  createPost, deletePost
} = require('../controllers/post');

const {verifyToken, verifyUserOwnsPostOrAdmin} = require('../middleware/auth.js')

const router = express.Router();

router.post("/", verifyToken, createPost);

router.delete("/:id", verifyToken,  deletePost )

module.exports = router;

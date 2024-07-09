const express = require("express");
const {
  createPost,
  deletePost
} = require('../controllers/post');
const { verifyToken } = require('../middleware/universal')
const { verifyAdmin } = require('../middleware/posts')

const router = express.Router();

router.post("/", createPost);
router.delete("/:id", verifyToken, verifyAdmin, deletePost)


module.exports = router;

const express = require("express");
const {
  createPost,
  deletePosts
} = require('../controllers/post');

const router = express.Router();

router.post("/", createPost);

router.delete("/:postId", deletePosts)

module.exports = router;

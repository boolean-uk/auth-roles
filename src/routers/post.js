const express = require("express");
const { createPost, deletePostById } = require("../controllers/post");
const { verifyToken, verifyPostPermissons } = require("../middleware/auth");

const router = express.Router();

router.post("/", createPost);

router.delete("/:id", verifyToken, verifyPostPermissons, deletePostById);

module.exports = router;

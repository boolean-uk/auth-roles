const express = require("express");

const { createPost, deletePost } = require("../controllers/post");
const { verifyToken, verifyAdminRole } = require("../middleware/roles");

const router = express.Router();

router.post("/", createPost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;

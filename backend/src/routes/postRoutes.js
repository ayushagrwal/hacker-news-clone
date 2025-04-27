const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.get("/", postController.getPosts);
router.get("/search", postController.searchPosts);
router.get("/:id", postController.getPostById);

// Protected routes requiring authentication
router.post("/", authMiddleware, postController.createPost);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);
router.post("/:id/vote", authMiddleware, postController.votePost);

module.exports = router; 
/**
 * Post Routes
 * Handles CRUD operations for posts and post-related actions (voting)
 * Contains both public and protected routes
 */
const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes - accessible without authentication
// Get all posts with pagination
router.get("/", postController.getPosts);
// Search posts by title or content
router.get("/search", postController.searchPosts);
// Get a specific post by ID
router.get("/:id", postController.getPostById);

// Protected routes requiring authentication
// Create a new post
router.post("/", authMiddleware, postController.createPost);
// Update an existing post (only by author)
router.put("/:id", authMiddleware, postController.updatePost);
// Delete a post (only by author)
router.delete("/:id", authMiddleware, postController.deletePost);
// Upvote or downvote a post
router.post("/:id/vote", authMiddleware, postController.votePost);
// Check if the current user has voted on a specific post
router.get("/:id/check-vote", authMiddleware, postController.checkUserVoted);

module.exports = router; 
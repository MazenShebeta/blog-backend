const router = require("express").Router();
const Post = require("../controllers/postsController");

// Create post
router.post("/", Post.create);

// Update post
router.put("/:id", Post.update);

// Delete post
router.delete("/:id", Post.delete);

// Get post
router.get("/:id", Post.get);

// Get all posts
router.get("/", Post.getAll);

module.exports = router;

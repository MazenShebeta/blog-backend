const router = require("express").Router();
const Post = require("../controllers/postsController");
const auth = require("../middlewares/auth");

// Create post
router.post("/", auth, Post.create);

// Update post
router.put("/:id", auth, Post.update);

// Delete post
router.delete("/:id", auth, Post.delete);

// Get post
router.get("/:id", Post.get);

// Get all posts
router.get("/", Post.getAll);

module.exports = router;

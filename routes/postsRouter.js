const router = require("express").Router();
const Post = require("../controllers/postsController");

// Create post
router.post("/", async (req, res) => {
  Post.create(req, res);
});

// Update post
router.put("/:id", async (req, res) => {
  Post.update(req, res);
});

// Delete post
router.delete("/:id", async (req, res) => {
  Post.delete(req, res);
});

// Get post
router.get("/:id", async (req, res) => {
  Post.get(req, res);
});

// Get all posts
router.get("/", async (req, res) => {
  Post.getAll(req, res);
});

module.exports = router;

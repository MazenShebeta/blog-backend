const router = require("express").Router();
const User = require("../controllers/usersController");

// Update
router.put("/:id", async (req, res) => {
  User.update(req, res);
});

// Delete
router.delete("/:id", async (req, res) => {
  User.delete(req, res);
});

// Get a user
router.get("/:id", async (req, res) => {
  User.get(req, res);
});

module.exports = router;

const router = require("express").Router();
const User = require("../controllers/usersController");
const auth = require("../middlewares/auth");

// Update user
router.patch("/:id", auth, User.update);

// Delete user
router.delete("/:id", auth, User.delete);

// Get user
router.get("/:username", User.get);

module.exports = router;

const router = require("express").Router();
const User = require("../controllers/usersController");

// Register
router.post("/register", async (req, res) => {
  User.Register;
});

// Login
router.post("/login", async (req, res) => {
  User.Login;
});

module.exports = router;

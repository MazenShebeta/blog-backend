const router = require("express").Router();
const Auth = require("../controllers/authController");

// Register
router.post("/register", async (req, res) => {
  Auth.register(req, res);
});

// Login
router.post("/login", async (req, res) => {
  Auth.login(req, res);
});

module.exports = router;

const router = require("express").Router();
const Auth = require("../controllers/authController");

const multer = require("multer");
const dataController = require("../controllers/dataController.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");


// Register
router.post("/register", upload, dataController.uploadFile,  async (req, res) => {
  Auth.register(req, res);
});

// Login
router.post("/login", async (req, res) => {
  Auth.login(req, res);
});

module.exports = router;

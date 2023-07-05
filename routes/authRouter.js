const router = require("express").Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth")

const multer = require("multer");
const dataController = require("../controllers/dataController.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");


// Register
router.post("/register", upload, dataController.uploadFile,  authController.register);

// Login
router.post("/login", authController.login);

router.post("/verify/:token", authController.verifyEmail);
router.delete("/logout", auth, authController.logout);
router.post("/forgot", authController.forgotPassword);
router.patch("/reset/:token", authController.resetPassword);

module.exports = router;

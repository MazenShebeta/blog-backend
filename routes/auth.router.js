const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const auth = require("../middlewares/auth.js")

const multer = require("multer");
const dataController = require("../controllers/data.controller.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");


router.post("/register", upload, dataController.uploadFile,  authController.register);
router.post("/login", authController.login);
router.delete("/logout", auth, authController.logout);

router.post("/verify/:token", authController.verifyEmail);
router.post("/forgot", authController.forgotPassword);
router.patch("/reset/:token", authController.resetPassword);

module.exports = router;

const express = require("express");
const route = express.Router();
const multer = require("multer");

const dataController = require("../controllers/dataController.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

// const uploadMulti = multer({ storage: storage }).array("files");
route.post("/upload", upload, dataController.uploadAndRespond);

module.exports = route;
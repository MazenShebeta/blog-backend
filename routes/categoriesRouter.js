const router = require("express").Router();
const Category = require("../controllers/categoriesController");

// Create new category
router.post("/", Category.create);

// Get all categories
router.get("/", Category.getAll);

module.exports = router;

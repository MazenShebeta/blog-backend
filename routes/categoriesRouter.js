const router = require("express").Router();
const Category = require("../controllers/categoriesController");

// Create new category
router.post("/", async (req, res) => {
  Category.create(req, res);
});

// Get all categories
router.get("/", async (req, res) => {
  Category.getAll(req, res);
});

module.exports = router;

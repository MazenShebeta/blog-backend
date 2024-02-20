const router = require("express").Router();
const Category = require("../controllers/categories.controller");
const auth = require("../middlewares/auth");

// Get all categories
router.get("/", auth, Category.getAll);
// Create new category
router.post("/", auth, Category.create);
// Update category
router.put("/:id", auth, Category.update);
// Delete category
router.delete("/:id", auth, Category.delete);

module.exports = router;

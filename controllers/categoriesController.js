const Category = require("../models/Category");

class categories {
  // Create new category
  static async create(req, res) {
    if (req.user.role != "admin" || req.user.role == "user")
      throw new Error("Not authorized!");

    const newCategory = new Category(req.body);
    try {
      const savedCategory = await newCategory.save();
      res.status(200).json(savedCategory);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  // Get all categories
  static async getAll(req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = categories;

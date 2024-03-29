const Category = require("../models/category.model");

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
      res.status(400).json({message: error.message});
    }
  }

  static async update(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (req.user.role != "admin") res.status(403).json({message: "Not authorized!"});
      category.update(req.body);
      await category.save();
      res.status(200).json({ message: "Category has been updated", category });
    } catch (err) {
      res.status(400).json({message: error.message});
    }
  }

  static async delete(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (req.user.role != "admin") res.status(403).json({message: "Not authorized!"});
      await category.delete();
      res.status(200).json({message: "Category has been deleted"});
    } catch (err) {
      res.status(400).json({message: error.message});
    }
  }

  // Get all categories
  static async getAll(req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(400).json({message: error.message});
    }
  }
}

module.exports = categories;

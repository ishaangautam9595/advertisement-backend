const mongoose = require("mongoose");
const Category = require("../models/category");
const Subcategory = require("../models/subCategory");

module.exports = {
  getCategories: (req, res, next) => {
    Subcategory.find()
      .select("name description status")
      .then((result) => {
        res.status(200).json({
          message: "Sub Categories loaded sucessfully",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  },

  getCategoryById: (req, res, next) => {
    const id = req.params.id;

    Subcategory.find({ _id: id })
      .select("name description status")
      .then((result) => {
        res.status(200).json({
          message: "selected SubCategory loaded sucessfully",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  },

  getSubCategoryByCategoryId: async (req, res) => {
    try {
      const categoryId = req.params.id;

      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const subcategories = await Subcategory.find({
        parentCategory: category,
      });

      res.status(200).json(subcategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createSubcategory: async (req, res) => {
    try {
      // Check if the parent category exists
      const parentCategory = await Category.findOne({'_id' : req.body.parentCategory});
      if (!parentCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Create a new subcategory
      const subcategory = new Subcategory({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        parentCategory: parentCategory._id,
      });
      await subcategory.save();
      
      // Update the parent category with the new subcategory
      parentCategory.subcategories.push(subcategory);
      await parentCategory.save();

      res.status(201).json(subcategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

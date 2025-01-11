const mongoose = require("mongoose");
const multer = require("multer");
const Product = require("../models/product");
const Category = require("../models/category");
const Subcategory = require("../models/subCategory");
const Location = require("../models/locations");
const ProductDescription = require("../models/productdetails");

const storage = multer.diskStorage({
  destination: "./uploads/",  // Check if this folder exists
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("images", 5);

module.exports = {
  addProduct: async (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const product = Product({
        _id: new mongoose.Types.ObjectId(),
        user: req.userData._id,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        location: req.body.location,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      });

      const imageUrls = req.files.map((file) => {
        return `http://localhost:8000/uploads/${file.filename}`;
      });
      console.log(imageUrls)
      product
        .save()
        .then(async (result) => {
          const productDescription = await ProductDescription({
            _id: new mongoose.Types.ObjectId(),
            product: result._id,
            price: req.body.price,
            images: imageUrls,
          }).save();

          res.status(201).json({
            message: "Product added sucessfully",
            data: { result, productDescription },
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    });
  },

  getProductList: async (req, res, next) => {
    const { category, location, search, range, subCategory, sort } = req.query;

    try {
      // Find the ObjectId for the provided category name
      const categoryObject = category ? await Category.findOne({ _id: category }) : null;

      // Find the ObjectId for the provided location city
      const locationObject = location ? await Location.findOne({ _id: location }) : null;

      const subCategoryObject = subCategory ? await Subcategory.findOne({ _id: subCategory }) : null;


      // location Query
      let locationQuery = {};
      if (locationObject) {
        locationQuery = {
          $match: {
            "location._id": locationObject._id,
          },
        };
      } else {
        locationQuery = {
          $match: {},
        };
      }

      // category Query
      let categoryQuery = {};
      if (categoryObject) {
        categoryQuery = {
          $match: {
            "category._id": categoryObject._id,
          },
        };
      } else {
        categoryQuery = {
          $match: {},
        };
      }

      let subCategoryQuery = {};
      if (subCategoryObject) {
        subCategoryQuery = {
          $match: {
            "subCategory": subCategoryObject._id,
          },
        };
      } else {
        subCategoryQuery = {
          $match: {},
        };
      }

      // search Query
      let matchQuery = {};
      if (search) {
        matchQuery = {
          $match: {
            name: { $regex: new RegExp(search, 'i') },
          },
        };
      } else {
        matchQuery = {
          $match: {},
        };
      }

      // range query
      let rangeQuery = {};
      if (range !== undefined) {
        if (range === '0' || range === '0,0') {
          // If range is '0', show all products in the specified category and location
          rangeQuery = {
            $match: {},
          };
        } else {
          const [minPrice, maxPrice] = range.split(',').map(Number);
      
          rangeQuery = {
            $match: {
              'productDetails.price': {
                $gte: minPrice,
                $lte: maxPrice,
              },
            },
          };
        }
      } else {
        rangeQuery = {
          $match: {},
        };
      }
      
      let sortQuery = { $sort: { time: -1 } };
      if (sort) {
      switch (sort) {
        case 'oldest':
          sortQuery = { $sort: { time: 1 } };
          break;
        case 'newest':
          sortQuery = { $sort: { time: -1 } };
          break;
        case 'lowToHigh':
          sortQuery = { $sort: { 'productDetails.price': 1 } };
          break;
        case 'highToLow':
          sortQuery = { $sort: { 'productDetails.price': -1 } };
          break;
        default:
          sortQuery = { $sort: { time: 1 } };
      }
    }

      const results = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $lookup: {
            from: "productdetails",
            localField: "_id",
            foreignField: "product",
            as: "productDetails",
          },
        },
        matchQuery,
        locationQuery,
        categoryQuery,
        rangeQuery,
        subCategoryQuery,
        sortQuery
      ]);

      // Filter out products with null category or location (if needed)
      const filteredResults = results.filter(
        (product) => product.category && product.location
      );

      // Send the product list as a JSON response
      res.json({
        message: "Products loaded successfully",
        data: filteredResults,
      });
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllProducts: (req, res, next) => {
    Product.find().then((result) => {
      res.status(200).json({
        message: "Products loaded sucessfully",
        data: result,
      });
    });
  },

  getProductById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const product = await Product.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategory",
            foreignField: "_id",
            as: "subCategory",
          },
        },

        {
          $lookup: {
            from: "locations",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },

        {
          $lookup: {
            from: "productdetails",
            localField: "_id",
            foreignField: "product",
            as: "productDetails",
          },
        },
      ]);

      if (!product || product.length === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product loaded successfully",
        data: product[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

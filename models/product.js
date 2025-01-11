const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: 1,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual("Category", {
  ref: "Category",

  foreignField: "category",

  localField: "_id",

  // justOne: true
});

productSchema.virtual("Location", {
  ref: "Location",

  foreignField: "location",

  localField: "_id",

  // justOne: true
});

// productSchema.virtual("Subcategory", {
//   ref: "Subcategory",

//   foreignField: "subCategory",

//   localField: "_id",

//   // justOne: true
// });
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);

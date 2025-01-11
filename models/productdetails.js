const mongoose = require("mongoose");
const Product = require("./product");

const productDetailSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  images: [{type: String}],
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProductDetail", productDetailSchema);

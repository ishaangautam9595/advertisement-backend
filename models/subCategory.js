const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
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
  time: {
    type: Date,
    default: Date.now,
  },
  parentCategory: 
  { type: mongoose.Schema.Types.ObjectId,
    ref: "categories" , 
    default : null
  },
});

module.exports = mongoose.model("Subcategory", subCategorySchema);

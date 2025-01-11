const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
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
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      default: null,
    },
  ],
});

categorySchema.virtual("Subcategory", {
  ref: "Subcategory",

  foreignField: "parentCategory",

  localField: "_id",

  // justOne: true
});
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Category", categorySchema);

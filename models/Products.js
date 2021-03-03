const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add title"],
    unique: true,
    trim: true,
    maxlength: [40, "Product title can not be more than 40 characters"],
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, "Description can not be more than 200 character"],
  },
  price: {
    type: String,
    required: true,
    maxlength: [40, "Product title can not be more than 40 characters"],
  },
  image: {
    type: String,
    required: true,
    maxlength: [400, "Product title can not be more than 40 characters"],
  },
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

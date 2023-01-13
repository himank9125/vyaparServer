const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    hsn: {
      type: Number,
      trim: true,
      required: true,
    },
    stock: {
      type: Number,
      trim: true,
      required: true,
    },
    batch: {
      type: String,
      trim: true,
      required: true,
    },
    rate: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const inventoryModel = mongoose.model("product", inventorySchema);

module.exports = inventoryModel;

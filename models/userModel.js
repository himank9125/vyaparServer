const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: [true, "Store Name Mandatory"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "First Name Mandatory"],
      trim: true,
    },
    mobile: {
      type: Number,
      required: [true, "Mobile Number Mandatory"],
      trim: true,
      min: 1000000000,
      max: 9999999999,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email Mandatory"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password Mandatory"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address Mandatory"],
      trim: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

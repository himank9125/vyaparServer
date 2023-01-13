const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/reg", async (req, res) => {
  try {
    const {
      storeName,
      userName,
      mobile,
      email,
      password,
      confpassword,
      address,
    } = req.body;
    if (password !== confpassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password should be same" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const data = await userModel.create({
      storeName,
      userName,
      mobile,
      email,
      address,
      password: hashedPass,
    });
    if (!data) {
      return res.status(400).json({ error: "Please try again after sometime" });
    }
    const token = jwt.sign({ id: data._id }, process.env.JWT_TOKEN_KEY_PART, {
      expiresIn: "7d",
    });

    res.status(200).json({ data, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userModel.findOne({ email });
    if (!data) {
      return res
        .status(400)
        .json({ error: "Entered mail is not registered with us" });
    }
    const passverify = await bcrypt.compare(password, data.password);
    if (!passverify) {
      return res.status(400).json({
        error: "Please enter correct password",
      });
    }
    const token = jwt.sign({ id: data._id }, process.env.JWT_TOKEN_KEY_PART, {
      expiresIn: "7d",
    });
    res.status(200).json({ data, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

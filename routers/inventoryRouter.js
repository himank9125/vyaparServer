const express = require("express");
const AuthLog = require("../auth/auth");
const inventoryModel = require("../models/inventoryModel");
const router = express.Router();

router.post("/add", AuthLog, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, hsn, stock, batch, rate, expiry } = req.body;
    const data = await inventoryModel.create({
      name,
      hsn,
      stock,
      batch,
      rate,
      storeId: userId,
    });
    if (!data) {
      return res.status(400).json({ error: "issue with product creation" });
    }
    res.status(200).json({ data, message: "product created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/:id", AuthLog, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, hsn, stock, batch, rate } = req.body;
    const data = await inventoryModel.updateOne(
      { _id: id },
      { name, hsn, stock, batch, rate }
    );
    if (!data) {
      return res.status(400).json({ error: "Please Try again" });
    }
    res.status(200).json({ data, message: "successfully updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", AuthLog, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await inventoryModel.deleteOne({ _id: id });
    if (!data) {
      return res.status(400).json({ error: "Please try again" });
    }
    res.status(200).json({ data, message: "Product Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/dashboard", AuthLog, async (req, res) => {
  try {
    const id = req.userId;
    const data = await inventoryModel.find({ storeId: id });
    if (!data) {
      return res.status(400).json({ error: "Please try after sometime" });
    }
    res.status(200).json({ data, message: "Here is list of your products" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/query/:q", AuthLog, async (req, res) => {
  try {
    const str = req.params.q;
    const id = req.userId;
    const regex = new RegExp(str, "i"); // i for case insensitive
    const data = await inventoryModel.find({
      $and: [{ storeId: id }, { name: { $regex: regex } }],
    });
    if (!data) {
      return res.status(400).json({ error: "No item found" });
    }
    res.status(200).json({ data, message: "Here is list of your products" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

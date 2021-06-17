const express = require("express");
const router = express.Router();
const messageModel = require("../Models/message/schema");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const { senderId, recieverId, body } = req.body;
  try {
    let newMessage = new messageModel({
      _id: mongoose.Types.ObjectId(),
      senderId,
      recieverId,
      body,
    });
    await newMessage.save();
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;

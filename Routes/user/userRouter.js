const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../Models/user/schema");
const { updatedUserObject } = require("../../Models/user/index");
const { userValidation } = require("../../Models/user/userValidation");

router.post(
  "/",
  userValidation.passwordValidation,
  userValidation.mobileValitdation,
  async (req, res) => {
    const { username, password, mobile } = req.body;
    try {
      let encryptedPassword = bcrypt.hashSync(String(password), 8);
      let newUser = new userModel({
        _id: mongoose.Types.ObjectId(),
        username,
        password: encryptedPassword,
        mobile,
      });
      await newUser.save();
      res.status(201).json({ message: "Success", newUser: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

router.get("/:userId", async (req, res) => {
  let userId = req.params.userId;
  try {
    let user = await userModel.findById(userId);
    if (user) {
      res.status(200).json({ message: "Success", user });
    } else {
      res.status(400).json({ message: "User not found!" });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ message: "Invalid user id!" });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
});

router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    let updatedUser = await updatedUserObject(req.body);
    let user = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: updatedUser },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json({ message: "Success", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await userModel.findById(userId);
    if (user) {
      let deletedUser = await userModel.findOneAndDelete({ _id: userId });
      res.status(200).json({ message: "Success", deletedUser });
    } else {
      res.status(400).json({ message: "User not found!" });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ message: "Invalid user id!" });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
});

module.exports = router;

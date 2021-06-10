const express = require("express");
const router = express.Router();
const userModel = require("../Models/user/schema");
const bcrypt = require("bcrypt");
const { userValidation } = require("../Models/user/userValidation");
const mongoose = require("mongoose");

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

router.get("/:id", async (req, res) => {
  let userId = req.params.id;
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

module.exports = router;

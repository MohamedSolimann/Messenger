const express = require("express");
const router = express.Router();
const userModel = require("../Models/user/user.model");
const bcrypt = require("bcrypt");
const { userValidation } = require("../Models/user/userValidation");

router.post(
  "/",
  userValidation.passwordValidation,
  userValidation.mobileValitdation,
  async (req, res) => {
    const { username, password, mobile } = req.body;
    try {
      let encryptedPassword = bcrypt.hashSync(password, 8);
      let newUser = new userModel({
        username,
        password: encryptedPassword,
        mobile,
      });
      await newUser.save();
      res.status(201).json({ message: "Success", newUser: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
);

module.exports = router;

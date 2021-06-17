const express = require("express");
const router = express.Router();
const { userValidation } = require("../Models/user/userValidation");
const userModel = require("../Models/user/schema");

router.post("/", userValidation.mobileValitdation, async (req, res) => {
  let { mobile, userId } = req.body;
  try {
    let userToBeAdded = await userModel.findOne({ mobile }).lean();
    if (userToBeAdded) {
      let updatedUser = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $push: { contacts: userToBeAdded } },
        { new: true, useFindAndModify: false }
      );
      res.status(201).json({ message: "Success", updatedUser });
    } else {
      res.status(400).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

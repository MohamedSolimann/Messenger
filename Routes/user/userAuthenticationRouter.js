const express = require("express");
const router = express.Router();
const userModel = require("../../Models/user/schema");
const { userValidation } = require("../../Models/user/userValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signin", userValidation.mobileValitdation, async (req, res) => {
  const { mobile, password } = req.body;
  try {
    let user = await userModel.findOne({ mobile }).lean();
    if (user) {
      let validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        let token = jwt.sign({ id: user._id }, "secret");
        res.cookie("Authorization", token);
        res.status(200).json({ message: "Success", userId: user._id });
      } else {
        res
          .status(400)
          .json({ message: "Incorrect password, please try again!" });
      }
    } else {
      res.status(400).json({ message: "Incorrect mobile, please try again!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

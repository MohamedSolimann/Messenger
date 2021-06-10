module.exports = {
  userValidation: {
    mobileValitdation: function (req, res, next) {
      let mobileLength;
      if (typeof req.body.mobile === "number") {
        mobileLength = String(req.body.mobile).length;
      } else {
        mobileLength = req.body.mobile.length;
      }
      if (typeof req.body.mobile === "string" && mobileLength !== 11) {
        res.status(400).json({
          message: "Error in type and length of Mobile!",
          error: ["Mobile must be a Number!", "Mobile must be 11 characters"],
        });
      } else if (mobileLength !== 11) {
        res.status(400).json({
          message: "Error",
          error: "Mobile must be 11 characters",
        });
      } else if (typeof req.body.mobile === "string") {
        res.status(400).json({
          message: "Error",
          error: "Mobile must be a Number!",
        });
      } else {
        next();
      }
    },
    passwordValidation: function (req, res, next) {
      if (String(req.body.password).length < 8) {
        res.status(400).json({
          message: "Error",
          error: "Password must be 8 characters or more!",
        });
      } else {
        next();
      }
    },
  },
};

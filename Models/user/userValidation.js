module.exports = {
  userValidation: {
    mobileValitdation: function (req, res, next) {
      if (typeof req.body.mobile === "string") {
        res
          .status(400)
          .json({ message: "Error", error: "Mobile must be a Number!" });
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

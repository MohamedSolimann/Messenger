module.exports = {
  userValidation: {
    mobileValitdation: function (req, res, next) {
      if (typeof req.body.mobile === "string" && req.body.mobile.length < 8) {
        res.status(400).json({
          message: "Mobile must be a Number and 11 digits!",
        });
      } else if (typeof req.body.mobile === "string") {
        res.status(400).json({
          message: "Mobile must be a Number",
        });
      } else if (String(req.body.mobile).length < 8) {
        res.status(400).json({
          message: "Mobile must be 11 digits",
        });
      } else {
        next();
      }
    },
    passwordValidation: function (req, res, next) {
      req.body.password = String(req.body.password);
      if (req.body.password.length < 8) {
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

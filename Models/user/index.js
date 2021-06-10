const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const createNewUser = async (request) => {
  const response = await request.post("/users").send({
    _id: mongoose.Types.ObjectId(),
    username: "mohamed",
    password: "mohamedd",
    mobile: 12345678910,
  });
  return response.body.newUser;
};

const updatedUserObject = (reqBody) => {
  let updateUserdObject = {};
  let userObject = reqBody;
  let encryptedPassword;
  for (let info in userObject) {
    if (userObject[info] !== null) {
      if (info === "password") {
        encryptedPassword = bcrypt.hashSync(userObject[info], 8);
        updateUserdObject[info] = encryptedPassword;
      } else {
        updateUserdObject[info] = userObject[info];
      }
    }
  }
  return updateUserdObject;
};
module.exports = { createNewUser, updatedUserObject };

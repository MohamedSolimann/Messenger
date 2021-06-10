const mongoose = require("mongoose");

const createNewUser = async (request) => {
  const response = await request.post("/users").send({
    _id: mongoose.Types.ObjectId(),
    username: "mohamed",
    password: "mohamedd",
    mobile: 12345678910,
  });
  console.log(typeof response.body.newUser._id);
  return response.body.newUser;
};

module.exports = { createNewUser };

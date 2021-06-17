const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  recieverId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  body: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("Message", messageSchema);

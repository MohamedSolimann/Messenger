const express = require("express");
const app = express();
const userRoutes = require("./Routes/userRouter");
const config = require("config");
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("hi");
});

app.use(express.json());
app.use("/users", userRoutes);

mongoose.connect(
  `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once("open", () => {
  app.listen(config.server.port, () => {
    console.log("up and running ...");
  });
});

module.exports = app;

const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRouter");

app.get("/", (req, res) => {
  res.send("hi");
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
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

const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRouter");
const contactsRouter = require("./Routes/contactsRouter");
const messageRouter = require("./Routes/messageRouter");

app.get("/", (req, res) => {
  res.send("hi");
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use("/users", userRoutes);
app.use("/contacts", contactsRouter);
app.use("/messages", messageRouter);

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

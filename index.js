const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
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
const server = app.listen(config.server.port, () => {
  console.log("up and running ...");
});
db.once("open", () => {
  server;
});

const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");
});
module.exports = app;

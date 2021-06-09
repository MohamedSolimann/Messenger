const express = require("express");
const app = express();
const userRoutes = require("./Routes/userRouter");

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/user", userRoutes);

app.listen(8000, () => {
  console.log("up and running ...");
});

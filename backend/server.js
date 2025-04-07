require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/dbConnection");
const userController = require("./controllers/user.controllers");

connectDB();
app.use(express.json());

app.post("/api/signup", userController.userReg);
app.get("/api/login", userController.userLogin);

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});

require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/dbConnection");
const userController = require("./controllers/user.controllers");
// const verifyToken = require("./middleware/auth.middleware");
const onboardingController = require("./controllers/onboarding.controllers");

connectDB();
app.use(express.json());

app.post("/api/signup", userController.userReg);
app.post("/api/login", userController.userLogin);
app.post("/api/onboarding", onboardingController.uploadData);

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});

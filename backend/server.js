require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const dbConnect = require("./lib/db");

dbConnect();
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});

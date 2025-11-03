require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes");
const dbConnect = require("./lib/db");
const cors = require("cors");
const chatRouter = require("./routes/chat.routes");

dbConnect();
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", chatRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});

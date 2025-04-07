const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected");
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;

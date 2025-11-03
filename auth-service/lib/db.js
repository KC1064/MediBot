const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;

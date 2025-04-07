const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    required: true,
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;  
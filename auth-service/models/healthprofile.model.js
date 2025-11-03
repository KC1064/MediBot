const mongoose = require("mongoose");

const HealthProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  age: {
    type: Number,
    required: true,
    min: 0,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },

  height: {
    type: Number, // in cm
    required: true,
    min: 30,
  },

  weight: {
    type: Number, // in kg
    required: true,
    min: 2,
  },

  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },

  medicalHistories: {
    type: [String], // Example: ["Diabetes", "Hypertension"]
    default: [],
  },
  lifestyle: {
    type: String,
    enum: ["Active", "Not Active", "Alcohol", "Smoking"],
    required: true,
  },

  allergies: {
    type: [String], // Example: ["Peanuts", "Pollen"]
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserHealthProfile = mongoose.model("HealthProfile", HealthProfileSchema);
module.exports = UserHealthProfile;

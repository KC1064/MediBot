const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema(
  {
    fullName: {
      required: true,
      type: String,
    },
    height: {
      required: true,
      type: Number,
    },
    weight: {
      required: true,
      type: Number,
    },
    age: {
      required: true,
      type: Number,
    },
    history: {
      type: [],
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Prefer Not to Say", "Other"],
    },
  },
  { timestamps: true }
);

const Onboarding = mongoose.model("Onboarding", onboardingSchema);

module.exports = Onboarding;

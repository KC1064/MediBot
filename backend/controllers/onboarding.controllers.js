const Onboarding = require("../models/onboarding.model");

const uploadData = async (req, res) => {
  try {
    const data = req.body;
    const fullName = data.fullName;

    // Create a new Onboarding document
    const newOnboarding = await Onboarding.create({
      fullName: data.fullName,
      height: data.height,
      weight: data.weight,
      age: data.age,
      history: data.history,
      gender: data.gender,
    });
    res.status(201).json({
      success: true,
      msg: "Onboarding data uploaded successfully",
      data: newOnboarding,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = { uploadData };

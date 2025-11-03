const User = require("../models/user.models");
const generateToken = require("../lib/generateToken");
const UserHealthProfile = require("../models/healthprofile.model");
const bcrypt = require("bcrypt");

// Controller for Create Account
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    // Generate JWT
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
};

// Controller for Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // return token or session handling
    return res
      .status(200)
      .json({ message: "Login successful", userId: user._id, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = () => {
  console.log("Logout");
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("firstName lastName");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const onboarding = async (req, res) => {
  try {
    const {
      age,
      gender,
      height,
      weight,
      bloodGroup,
      medicalHistories,
      allergies,
      lifestyle,
    } = req.body;

    const userId = req.user._id; // 👈 From the middleware

    // Check if the profile already exists
    const existingProfile = await UserHealthProfile.findOne({ user: userId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Health profile already exists." });
    }

    const profile = await UserHealthProfile.create({
      user: userId,
      age,
      gender,
      height,
      weight,
      bloodGroup,
      medicalHistories,
      allergies,
      lifestyle,
    });

    return res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  onboarding,
  getUserProfile,
};

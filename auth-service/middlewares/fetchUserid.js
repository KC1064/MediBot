const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token failed, authorization denied" });
  }
};

module.exports = protect;

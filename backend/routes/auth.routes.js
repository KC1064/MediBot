const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controllers");
const protect = require("../middlewares/fetchUserid");

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);
// router.post("/onboarding", authControllers.onboarding);
router.post("/onboarding", protect, authControllers.onboarding);

module.exports = router;

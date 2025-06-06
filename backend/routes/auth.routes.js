const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controllers");

router.post("/singup", authControllers.signup);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);

// router.post("/onboarding", () => {});

module.exports = router;

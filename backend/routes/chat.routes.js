const express = require("express");
const router = express.Router();
const protect = require("../middlewares/fetchUserid");
const chatControllers = require("../controllers/chat.controllers");

router.post("/chat", protect, chatControllers.chatWithGemini);
router.get("/chat/history", protect, chatControllers.getChatHistory);
module.exports = router;
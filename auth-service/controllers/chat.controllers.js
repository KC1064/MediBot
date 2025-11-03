const { GoogleGenAI } = require("@google/genai");
const Chat = require("../models/chat.models");
const User = require("../models/user.models");
const UserHealthProfile = require("../models/healthprofile.model");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, 
});

const chatWithGemini = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user._id;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const user = await User.findById(userId).select("firstName lastName email");
    const profile = await UserHealthProfile.findOne({ user: userId });

    let intro = "";
    if (user && profile) {
      intro = `This is a conversation with ${user.firstName} ${
        user.lastName
      } (email: ${user.email}). Their health profile: Age ${
        profile.age
      }, Gender ${profile.gender}, Height ${profile.height}cm, Weight ${
        profile.weight
      }kg, Blood Group ${profile.bloodGroup}, Lifestyle: ${
        profile.lifestyle
      }, Medical Histories: ${
        profile.medicalHistories.join(", ") || "None"
      }, Allergies: ${profile.allergies.join(", ") || "None"}.`;
    }

    let existingChat = await Chat.findOne({ user: userId });
    let contextToUse = intro;

    if (existingChat) {
      if (existingChat.context) {
        contextToUse = existingChat.context;
      } else {
        existingChat.context = intro;
        await existingChat.save();
      }
    }

    const systemPrompt = `You are a highly skilled, professional virtual Medical Assistant AI trained to assist with medical information, symptom triage, education, documentation, and insurance tasks. Your responses must be factual, HIPAA-compliant, and user-aware.

    Rules:
    1. No definitive diagnoses.
    2. No prescriptions.
    3. Avoid guessing; recommend consulting a doctor.
    4. No humor or slang.
    5. Only answer health/medical questions.
    6. Don't provide more information just keep it concise and relevant.

    Context: ${contextToUse}

    User's message: ${prompt}`;

    // Updated API call as per the new documentation
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    });

    // Extracting response text based on the documentation example
    const responseText = result.text;

    const newMessages = [
      { role: "user", content: prompt },
      { role: "bot", content: responseText },
    ];

    if (existingChat) {
      existingChat.messages.push(...newMessages);
      await existingChat.save();
    } else {
      await Chat.create({
        user: userId,
        messages: newMessages,
        context: contextToUse,
      });
    }

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Chat controller error:", error);
    res.status(500).json({ message: "Failed to process prompt" });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const chat = await Chat.findOne({ user: userId });
    if (!chat) {
      return res.status(200).json({ messages: [] });
    }
    res.status(200).json({ messages: chat.messages });
  } catch (error) {
    console.error("Get chat history error:", error);
    res.status(500).json({ message: "Failed to fetch chat history" });
  }
};

module.exports = { chatWithGemini, getChatHistory };

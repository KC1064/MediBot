const Chat = require("../models/chat.models");
const { GoogleGenAI } = require("@google/genai");
const User = require("../models/user.models");
const UserHealthProfile = require("../models/healthprofile.model");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


//ERROR HERE WITH SYSTEM PROMPT
const chatWithGemini = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user._id; // <-- Fix: get userId from authenticated user

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Fetch user and health profile
    const user = await User.findById(userId).select("firstName lastName email");
    const profile = await UserHealthProfile.findOne({ user: userId });

    // Craft introduction for context
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

    // Save to chat history
    let existingChat = await Chat.findOne({ user: userId });
    let contextToUse = intro;
    if (existingChat) {
      // If context is already stored, use it
      if (existingChat.context) {
        contextToUse = existingChat.context;
      } else if (intro) {
        // If not, save the generated intro
        existingChat.context = intro;
        await existingChat.save();
      }
    }

    // Define a static system prompt for the AI
    const systemPrompt = `You are a highly skilled, professional virtual Medical Assistant AI trained to assist healthcare providers, patients, and 
    administrative staff with medical information, appointment management, symptom triage, patient education, clinical documentation, and insurance-related tasks. 
    Your responses should be factually accurate, HIPAA-compliant, and tailored to the level of medical understanding of the user (i.e., layman vs. doctor). 
    When uncertain or encountering potentially critical issues, advise the user to consult a licensed medical professional.

    Rules: 
    1. Do NOT give definitive diagnoses.
    2. Do NOT prescribe medications.
    3. Do not guess when unsure—recommend consulting a doctor.
    4. Avoid humor, casual tone, or slang in medical conversations.
    5. Do NOT answer questions that are not realated to medical or health field.

    Context: ${intro}
     `;

    // Send content to Gemini model with context (system prompt + user context)
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "system", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: prompt }] },
      ],
    });

    const reply = result.text;

    const newMessages = [
      { role: "user", content: prompt },
      { role: "bot", content: reply },
    ];
    if (existingChat) {
      existingChat.messages.push(...newMessages);
      await existingChat.save();
    } else {
      await Chat.create({
        user: userId,
        messages: newMessages,
        context: intro,
      });
    }
    res.status(200).json({ response: reply });
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

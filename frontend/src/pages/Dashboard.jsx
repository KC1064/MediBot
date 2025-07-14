import React, { useState, useEffect } from "react";
import { SendHorizonal, UserCircle2, MessageSquareText } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    "Diabetes Report",
    "Allergy Summary",
    "Weekly Health Advice",
  ]);

  function getUserIdFromLocalStorage() {
    const id = localStorage.getItem("userId");
    return id || null;
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserIdFromLocalStorage();
      if (!userId) return;

      try {
        console.log(userId);
        const res = await axiosInstance.get(`/auth/user/${userId}`); // or `/user/${userId}` based on your routes
        const { firstName, lastName } = res.data;
        setUserName(`${firstName} ${lastName}`);
      } catch (err) {
        console.error(
          "Error fetching user:",
          err.response?.data || err.message
        );
        setUserName("User");
      }
    };

    const fetchChatHistory = async () => {
      try {
        const res = await axiosInstance.get("/chat/history");
        if (Array.isArray(res.data.messages)) {
          setMessages(res.data.messages);
        }
      } catch (err) {
        console.error("Error fetching chat history:", err.response?.data || err.message);
      }
    };

    fetchUser();
    fetchChatHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const res = await axiosInstance.post("/chat", { prompt: input });
      const botMsg = { role: "bot", content: res.data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, something went wrong." },
      ]);
    }
  };

  // Add a helper to generate chat history summaries for the sidebar
  const chatHistorySummaries = messages
    .filter((msg) => msg.role === "user")
    .map((msg, idx) => ({ content: msg.content, idx }));

  return (
    <div className="h-screen w-screen flex bg-transparent backdrop-blur-lg text-white">
      {/* Sidebar */}
      <div className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20 p-4 flex flex-col justify-between">
        {/* Top - Logo */}
        <div>
          <h2 className="text-2xl font-bold text-lime-400 mb-6">MediBot</h2>

          {/* Chat History */}
          <div className="space-y-2">
            <h3 className="text-sm text-gray-300 mb-2 font-semibold uppercase tracking-wide">Chat History</h3>
            {chatHistorySummaries.length === 0 ? (
              <div className="text-xs text-gray-400">No chat history yet.</div>
            ) : (
              chatHistorySummaries.map((item) => (
                <div
                  key={item.idx}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition p-2 rounded-lg cursor-pointer"
                  title={item.content}
                >
                  <MessageSquareText className="w-4 h-4 text-lime-300" />
                  <span className="text-sm truncate max-w-[140px]">{item.content.slice(0, 30)}{item.content.length > 30 ? '...' : ''}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom - Profile */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 p-2 mt-6 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer"
        >
          <UserCircle2 className="w-6 h-6 text-lime-400" />
          <span className="text-sm font-medium">Profile</span>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">
            Welcome, <span className="text-lime-400">{userName}</span>
          </h1>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto space-y-4 px-4 py-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
          {messages.length === 0 && (
            <div className="text-center text-gray-400">
              Start a conversation!
            </div>
          )}
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * idx }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                  msg.role === "user"
                    ? "bg-lime-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Box */}
        <form className="mt-4 flex items-center gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none border border-white/20"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-lime-500 rounded-lg hover:bg-lime-600 transition"
            disabled={!input.trim()}
          >
            <SendHorizonal className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

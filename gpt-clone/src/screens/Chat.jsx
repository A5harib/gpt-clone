import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import ChatResponse from "@/components/ChatResponse";
import EnterPrompt from "@/components/EnterPrompt";
import { Link } from "react-router-dom";
import ChatMessage from "@/components/ChatMessage";
import { motion } from "framer-motion";

const Chat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [msg, setMsg] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Runs every time messages change



  const getGeminiResponse = async (userMessage) => {
    const API_KEY = "AIzaSyCHA9-xhPVN9EkuOwV2li-Z8wLEC96DkVc";
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
      }),
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = { type: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput(""); // 
    setMessages((prev) => [...prev, { type: "ai", message: "Thinking..." }]);

    const result = await getGeminiResponse(input); // Call the API

    setMessages((prev) =>
      prev.map((msg, index) =>
        index === prev.length - 1 ? { ...msg, text: result } : msg
      )
    );
  };

  return (
    <div className="bg-gray-950 w-dvw h-screen overflow-y-auto text-white text-2xl flex flex-col">
      {/* Header */}
      <div className="flex justify-between p-4 border-b border-gray-800 sticky top-0 bg-gray-950">
        <div className="flex gap-4">
          <div className="font-bold text-[#B4B4B4]">ChatGPT</div>
          <FiEdit className="text-[#B4B4B4] font-bold text-2xl mt-1" />
        </div>
        <Link to="/">
          <button className="p-2 px-6 bg-white font-bold text-black rounded-full">
            Logout
          </button>
        </Link>
      </div>
      {/* Chat Body */}
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col justify-center items-center gap-2 mt-10 mb-96"
        >
          <div className="font-bold text-4xl mb-10">What can I help with?</div>
          <EnterPrompt handleSend={handleSend} input={input} setInput={setInput} />
          {/* <div className="flex flex-col justify-center items-center gap-2 mt-10 mb-96">
            <div className="font-bold text-4xl mb-10">What can I help with?</div>
            <EnterPrompt handleSend={handleSend} input={input} setInput={setInput} />
          </div> */}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col justify-between items-center gap-2 mt-10 min-h-screen mb-4">
          <div>
            {messages.map((msg, index) =>
              msg.type === "user" ? (
                <ChatMessage key={index} message={msg.text} />
              ) : (
                <ChatResponse key={index} responseMsg={msg.text} />
              )
            )}
          </div>
          <div className="flex flex-col justify-end bottom-0 sticky bg-gray-950 pb-4 pt-2">
            <EnterPrompt handleSend={handleSend} input={input} setInput={setInput} />
          </div>
        </motion.div>
      )}


      {/* <div className="flex flex-col justify-center items-center gap-2 mt-10 mb-96  ">
      
        <div className="font-bold text-4xl mb-10">What can I help with?</div>
        
        <EnterPrompt handleSend={handleSend} input={input} setInput={setInput} setMsg={setMsg} />
        Display AI Response
        <div>
          {msg ? <ChatMessage message={input} /> : null}
          <ChatResponse responseMsg={response} />
        </div>

      </div> */}


    </div>
  );
};

export default Chat;

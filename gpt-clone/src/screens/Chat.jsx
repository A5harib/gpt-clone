import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import arrow from "../assets/arrow_upward.png";
import ReactMarkdown from "react-markdown";
import TyperMark from "@/components/TyperMark";

const Chat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

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

    setResponse("Thinking..."); // Show loading state

    const result = await getGeminiResponse(input); // Call the API
    setResponse(result); // Update UI
    console.log("API response: ", response);
  };
  //bg-[#212121]
  return (
    <div className="bg-gray-950 w-dvw h-screen text-white text-2xl overflow-auto">
      {/* Header */}
      <div className="flex justify-between p-4">
        <div className="flex gap-4">
          <div className="font-bold text-[#B4B4B4]">ChatGPT</div>
          <FiEdit className="text-[#B4B4B4] font-bold text-2xl mt-1" />
        </div>
        <button className="p-2 px-6 bg-white font-bold text-black rounded-full">
          Logout
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex flex-col justify-center items-center gap-2 mt-10   ">
        <div className="font-bold text-4xl mb-10">What can I help with?</div>

        <form
          onSubmit={handleSend}
          className="w-7xl flex flex-col items-center"
        >
          <div className="flex p-4 h-3xl  bg-gray-900 rounded-4xl  w-5xl justify-between  ">
            <textarea
              className="p-2 w-full bg-gray-900 rounded-2xl text-white placeholder:text-gray-300 outline-0 resize-none overflow-hidden"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto"; // Reset height to recalculate
                e.target.style.height = `${e.target.scrollHeight}px`; // Expand dynamically
              }}
              // onKeyDown={}
            />
            <button
              type="submit"
              className="bg-white text-black rounded-full hover:bg-gray-200 w-16 h-16 flex items-center justify-center"
            >
              <img src={arrow} alt="hey" className="w-8 h-8" />
            </button>
          </div>
        </form>

        {/* Display AI Response */}
        <div className=" max-w-5xl p-4 whitespace-pre-wrap break-words "></div>
        {response ? <TyperMark sentence={response} /> : null}
      </div>
    </div>
  );
};

export default Chat;

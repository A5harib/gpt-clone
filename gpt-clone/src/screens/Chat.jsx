import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import ChatResponse from "@/components/ChatResponse";
import EnterPrompt from "@/components/EnterPrompt";
import { Link } from "react-router-dom";
import ChatMessage from "@/components/ChatMessage";

const Chat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [msg, setMsg] = useState(false);


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
    setMsg(true);

    e.preventDefault();
    if (!input.trim()) return;

    setResponse("Thinking..."); // Show loading state

    const result = await getGeminiResponse(input); // Call the API
    setResponse(result); // Update UI
    console.log("API response: ", response);
  };
  //bg-[#212121]
  console.log("sentence: ", response);
  return (
    <div className="bg-gray-950 w-dvw h-screen text-white text-2xl flex flex-col">
      {/* Header */}
      <div className="flex justify-between p-4">
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
      {response ?
        <div className="flex flex-col justify-between items-center gap-2 mt-10 min-h-screen mb-4 ">
          <div>
            {msg ? <ChatMessage message={input} /> : null}
            <ChatResponse responseMsg={response} />
          </div>
          <div className="  flex flex-col justify-end bottom-4 sticky  ">

            <EnterPrompt handleSend={handleSend} input={input} setInput={setInput} setMsg={setMsg} />
          </div>
        </div>
        :
        <div className="flex flex-col justify-center items-center gap-2 mt-10 mb-96  ">

          <div className="font-bold text-4xl mb-10">What can I help with?</div>

          <EnterPrompt handleSend={handleSend} input={input} setInput={setInput} setMsg={setMsg} />

          <div>
            {msg ? <ChatMessage message={input} /> : null}
            <ChatResponse responseMsg={response} />
          </div>

        </div>
      }

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

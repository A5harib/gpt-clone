import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import ChatResponse from "@/components/ChatResponse";
import EnterPrompt from "@/components/EnterPrompt";
import { Link } from "react-router-dom";
import ChatMessage from "@/components/ChatMessage";
import { motion } from "framer-motion";
import { db } from "../firebase"; // Ensure your firebase config exports 'db'
import { collection, addDoc, doc, updateDoc, getDocs, query, where, setDoc, orderBy, Timestamp, QuerySnapshot, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase"; // If using Firebase Auth
import ReactMarkdown from "react-markdown";



const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [promptName, setPromptName] = useState(null);
  const [pressEnter, setPressEnter] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Runs every time messages change
  const getGeminiResponse = async (conversationHistory = [], userMessage = "") => {
    const API_KEY = "AIzaSyCHA9-xhPVN9EkuOwV2li-Z8wLEC96DkVc";
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const structuredHistory = conversationHistory.map((msg) => ({
      role: msg.type === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Append current user message to keep the flow
    structuredHistory.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: structuredHistory })
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setPressEnter(true);
    if (!input.trim()) return;

    const userId = auth.currentUser?.uid;
    if (!userId) return alert("User not logged in");

    let now = new Date();
    let formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const sanitize = (str) => str.replace(/[^a-zA-Z0-9-_ ]/g, ' ').slice(0, 50);

    let conversationId;


    let summary = promptName;
    if (!selectedConversationId) {

      if (!summary && input.length >= 5) {
        summary = await getGeminiResponse(messages || [], `Summarize in 5 words: ${input}`);
        setPromptName(summary);
      }
      summary = summary || input;
      conversationId = sanitize((summary || input).trim());
      setSelectedConversationId(conversationId);
    } else {
      conversationId = selectedConversationId;
    }

    const conversationRef = doc(db, "users", userId, "conversations", conversationId);

    const userMessage = { type: "user", text: input, timestamp: formattedTime };
    const updatedHistory = [...messages, userMessage];

    setMessages([...updatedHistory, { type: "ai", text: "Thinking..." }]);
    setInput("");

    await setDoc(conversationRef, {
      messages: updatedHistory,
      promptName: promptName,
      createdAt: serverTimestamp(),
    }, { merge: true });

    const aiResponse = await getGeminiResponse(updatedHistory, input);

    const finalMessages = [...updatedHistory, { type: "ai", text: aiResponse, timestamp: formattedTime }];
    await updateDoc(conversationRef, {
      messages: finalMessages,
      createdAt: serverTimestamp(),
    });

    setMessages(finalMessages);
  };



  return (
    <div className="bg-gray-950 w-dvw h-screen overflow-y-auto text-white text-2xl flex flex-col">
      {/* Header */}

      <div className="flex justify-between p-3 border-b border-gray-800 sticky top-0 bg-gray-950   items-center">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <div className="font-bold text-white text-3xl">CharmAI</div>
          </Link>
          <Link to="/chat">

            <FiEdit className="text-white font-bold text-2xl mt-1" />
          </Link>

        </div>

        <div className="text-white text-xl flex items-center justify-center "><ReactMarkdown>{promptName}</ReactMarkdown> </div>

        <div className="flex gap-4">
          <Link to="/chat/history">
            <button className="p-2 px-6 bg-gray-800 hover:bg-gray-600 font-bold text-white cursor-pointer rounded-full transition-all duration-300">
              History
            </button>
          </Link>
          <Link to="/">
            <button className="p-2 px-6 bg-white font-bold text-black rounded-full cursor-pointer hover:bg-gray-300 transition-all duration-300">
              Logout
            </button>
          </Link>
        </div>
      </div>
      {/* Chat Body */}
      {messages.length === 0 || !pressEnter ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col justify-center items-center gap-2 h-screen  "
        >
          <div className="font-bold text-4xl mb-10">What can I help with?</div>
          <EnterPrompt handleSend={handleSend} input={input} setInput={setInput} setPressEnter={setPressEnter} />

        </motion.div>
      ) : (
        <motion.div
          ref={chatContainerRef}
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
      {/* {conversations.map((conv) => (
        <button key={conv.id} onClick={() => openConversation(conv.id)}>
          Conversation {conv.id}
        </button>
      ))} */}





    </div>
  );
};

export default Chat;

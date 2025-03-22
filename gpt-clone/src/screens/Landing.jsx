import Typer from "@/components/Typer";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const sentences = [
    "Generate creative names for a new tech startup.",
    "Come up with unique and futuristic names for a space exploration project.",
    "Brainstorm catchy titles for a fantasy novel.",
    "Suggest innovative product names for a fitness app.",
    "Generate a list of potential band names for an indie rock group.",
    "Come up with fun and quirky names for a coffee shop.",
    "List futuristic city names for a sci-fi story.",
    "Suggest powerful names for a new AI assistant.",
    "Brainstorm unique domain name ideas for a personal blog.",
    "Generate cool and mysterious character names for a thriller novel.",
  ];
  const [sentenceIndex, setSentenceIndex] = useState(0);
  function handleComp() {
    console.log("Sentence deleted, switching...");

    setSentenceIndex((sentenceIndex + 1) % sentences.length);
  }

  return (
    <div className="maindiv flex  h-screen w-screen">
      <div className="left flex-3/5 bg-[#01002E] h-screen text-purple-400 flex flex-col">
        <div className="p-4 font-bold h-1/2 text-2xl">ChatGPT</div>
        <div className="p-4 h-2/3 text-4xl font-bold">
          <Typer sentence={sentences[sentenceIndex]} onComplete={handleComp} />
        </div>
      </div>
      <div className=" text-3xl right flex-2/5 h-screen bg-black text-center flex flex-col items-center justify-center text-white gap-4 ">
        <div className="font-bold">Get Started</div>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white font-medium rounded-4xl px-8 py-3 text-lg shadow-md hover:bg-blue-700 transition w-[200px]">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-600 text-white font-medium rounded-full px-8 py-3 text-lg shadow-md hover:bg-blue-700 transition w-[200px]">
              Sign up
            </button>
          </Link>
        </div>
        <div className=" border-0 rounded-full text-xs m-4 font-bold hover:bg-gray-900 p-4">
          Try it first
        </div>
      </div>
    </div>
  );
};

export default Landing;

import React from 'react';
import arrow from "../assets/arrow_upward.png";
const EnterPrompt = ({ handleSend, input, setInput, setPressEnter }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault(); // 
            handleSend(e); // 
            setPressEnter(true); // 
        }
    };
    return (


        <form
        
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
                    onKeyDown={handleKeyDown}
                />
                <button
                    type="submit"
                    className="bg-white text-black rounded-full hover:bg-gray-200 w-16 h-16 flex items-center justify-center"
                >
                    <img src={arrow} alt="arrow" className="w-8 h-8" />
                </button>
            </div>
        </form>

    );
}

export default EnterPrompt;

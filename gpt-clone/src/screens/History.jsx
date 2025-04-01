import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const History = () => {
    return (
        <div className="bg-gray-950 w-dvw h-screen overflow-y-auto text-white text-2xl flex flex-col   ">
            {/* Header */}

            <div className="flex justify-between p-4 border-b border-gray-800 sticky top-0 bg-gray-950">
                <div className="flex gap-4">
                    <div className="font-bold text-[#B4B4B4]">ChatGPT</div>
                    <FiEdit className="text-[#B4B4B4] font-bold text-2xl mt-1" />
                </div>
                <div className="flex gap-4">
                    <Link to="/chat">
                        <button className="p-2 px-6 bg-gray-800 hover:bg-gray-600 font-bold text-white cursor-pointer rounded-full transition-all duration-300">
                            Chat
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="p-2 px-6 bg-white font-bold text-black rounded-full cursor-pointer hover:bg-gray-300 transition-all duration-300">
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
            <h1 className='text-white text-4xl m-5'>History</h1>
        </div>
    );
}

export default History;

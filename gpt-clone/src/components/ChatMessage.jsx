import React from 'react';

const ChatMessage = ({ message }) => {
    const msgbody = message;
    return (
        <div className='flex justify-end w-5xl '>
            <div className='bg-gray-900 text-white px-5 py-3 rounded-2xl response'>
                {msgbody}
            </div>
        </div>
    );
}

export default ChatMessage;

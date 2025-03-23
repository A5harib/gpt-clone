import React from 'react';
import TyperMark from './TyperMark';

const ChatResponse = ({ responseMsg }) => {
    return (
        <div className="flex  w-5xl justify-start">
            {responseMsg ? <div className="text-white max-w-5xl   whitespace-pre-wrap break-words .cms-content response text-wrap  px-8 text-2xl "> < TyperMark sentence={responseMsg} /> </div > : null}
        </div>
    );



}

export default ChatResponse;

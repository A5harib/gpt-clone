import { auth, db } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const History = () => {


    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    const fetchConversations = async (userId) => {
        // Create a query to fetch conversations
        const q = query(collection(db, "users", userId, "conversations"));

        // Execute the query and get a snapshot
        const querySnapshot = await getDocs(q);

        // Map through the snapshot to extract data
        const fetchedConversations = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            messages: doc.data().messages || [],
            promptName: doc.data().promptName || doc.id, // Use the doc.id if promptName is missing
            createdAt: doc.data().createdAt, // assuming this exists

        })).sort((a, b) => {
            // Sort by createdAt if it exists
            return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
        });

        // Update state with fetched conversations
        setConversations(fetchedConversations);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchConversations(user.uid); // pass uid directly
            }
        });

        return () => unsubscribe(); // cleanup listener
    }, []);
    const openConversation = (conversationId) => {
        const conversation = conversations.find((conv) => conv.id === conversationId);
        if (conversation) {
            setMessages(conversation.messages);
            setSelectedConversationId(conversationId);
        }
    };

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
            {conversations.map((conv) => (
                <button
                    key={conv.id}
                    onClick={() => openConversation(conv.id)}
                    className="p-4 m-2 bg-gray-800 rounded hover:bg-gray-700 text-left w-auto"
                >
                    <div className="font-bold">{conv.promptName}</div>
                    <div className="text-sm text-gray-400">{conv.messages.length} messages</div>
                </button>
            ))}

        </div>
    );
}

export default History;

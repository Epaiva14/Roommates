import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        // Fetch a list of active chats from the server
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat`)
            .then(response => {
                setChats(response.data.chats);
            })
            .catch(error => {
                console.error('Error fetching chats:', error);
            });
    }, []);

    return (
        <div>
            <h1>Chat Rooms</h1>
            <ul>
                {chats.map(chat => (
                    <li key={chat._id}>
                        <a href={`/chat/${chat._id}`}>{/* Link to individual chat room */}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatPage;

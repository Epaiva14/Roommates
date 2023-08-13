import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatRoom = ({ roomId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch messages for the specified chat room
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${roomId}/messages`)
            .then(response => {
                setMessages(response.data.messages);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, [roomId]);

    return (
        <div>
            <h1>Chat Room</h1>
            <ul>
                {messages.map(message => (
                    <li key={message._id}>
                        <div>
                            <strong>{message.sender.firstName}: </strong>
                            {message.content}
                        </div>
                        <div>{message.createdAt}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoom;

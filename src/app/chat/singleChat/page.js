'use client';
import Layout from '../../components/layout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MessageContent from '../ChatRoom';
import axios from 'axios';

const ChatRoomPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(true); // Initialize as true
    const [newMessage, setNewMessage] = useState(''); // Initialize as true

    useEffect(() => {
        fetchMessagesData();
    }, []);

    const fetchMessagesData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat`);
            const data = await response.json();
            setMessages(data.chat);
            setLoading(false); // Set loading to false after fetching data
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            return; // Prevent sending empty messages
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newMessage }), // Send the new message content
            });
            const data = await response.json();
            // Assuming the response includes the updated messages array with the new message
            setMessages(data.messages);
            setNewMessage(''); // Clear the input field after sending
            router.push(`chat/singleChat/${data.chat._id}`)
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (isLoading) return <p>Loading...</p>;



    return (
        <>
            <Layout />
            <div className="chat-room-page">
                <div className="chat-room-container">
                    <div className="chat-room-header">
                        <h1>Ethan:</h1>
                    </div>
                    <div className="chat-room-messages">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            messages.map((message, index) => (
                                <MessageContent key={index} content={message.content} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="chat-room-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </>
    );
};

export default ChatRoomPage;
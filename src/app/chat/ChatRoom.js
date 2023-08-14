import React from 'react';

export default function MessageContent({ content }) {
    console.log('content:', content);

    return (
        <div className="message">
            <div className="message-header">
                <p>{content}</p>
            </div>
        </div>
    );
}
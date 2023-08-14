// ChoreCard.js
import React from 'react';

export default function ChoreCard({ chore }) {

    const parsedDate = new Date(chore.dueDate);
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();
    const formattedDate = `${month}/${day}/${year}`;

    return (
        <div className="card">
            <div className="card-content">
                {chore.assignee && (
                    <p className="chore-subtitle">
                        From: {chore.assignee.firstName}
                    </p>
                )}
                <hr />
                <p className="chore-title">
                    {chore.chore}
                </p>
                <hr />
                <p className="chore-date">
                    Due: {formattedDate}
                </p>
            </div>
            <footer className="card-footer">
                <button className="button is-primary choreButton">Complete</button>
            </footer>
        </div>
    );
}


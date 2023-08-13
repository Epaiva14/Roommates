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
                <p className="title">
                    {chore.chore}
                </p>
                {chore.assignee && (
                    <p className="subtitle">
                        {chore.assignee.firstName}
                    </p>
                )}
                <p className="subtitle">
                    {formattedDate}
                </p>
                <button className="button is-primary">Complete</button>

            </div>
            <footer className="card-footer">
                <p className="card-footer-item">
                    <span>
                        View
                    </span>
                </p>
                <p className="card-footer-item">
                    <span>
                        Edit
                    </span>
                </p>
                <p className="card-footer-item">
                    <span>
                        Delete
                    </span>
                </p>
            </footer>
        </div>
    );
}


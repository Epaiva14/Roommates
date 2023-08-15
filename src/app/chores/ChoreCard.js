// ChoreCard.js
import React from 'react';

export default function ChoreCard({ chore }) {

    const parsedDate = new Date(chore.dueDate);
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();
    const formattedDate = `${month}/${day}/${year}`;

    const handleCompleteChore = async () => {
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chores/${chore._id}`, {
                completed: true,
            });
            // Update the state to reflect the completed chore
            // You might need to pass a callback function from your parent component to update the state
        } catch (error) {
            console.error('Error completing chore:', error);
        }
    };


    return (
        <div className="column is-narrow">
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
                    {!chore.completed && (
                        <button className="button is-primary choreButton" onClick={handleCompleteChore}>Complete</button>
                    )}
                </footer>
            </div>
        </div>
    );
}


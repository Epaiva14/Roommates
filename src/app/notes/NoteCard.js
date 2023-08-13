import React from "react";

export default function NoteCard({ note }) {
    console.log('note.creator:', note.creator);
    console.log('type of note creator:', typeof note.creator)
    console.log('note.creator.firstName:', note.creator.firstName);

    const creatorFirstName = note.creator.length > 0 ? note.creator[0].firstName : '';
    return (
        <div className="card">
            <div className="card-content">
                {creatorFirstName && (
                    <p className="title">
                        {creatorFirstName}
                    </p>
                )}

                <p className="subtitle">
                    {note.content}
                </p>
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
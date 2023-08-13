import React from "react";

export default function NoteCard({ note }) {

    return (
        <div className="card">
            <div className="card-content">

                <p className="title">
                    {note.creator.firstName}
                </p>
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
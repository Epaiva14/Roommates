import React from "react";

export default function NoteCard({ note }) {

    const creatorFirstName = note.creator.length > 0 ? note.creator[0].firstName : '';
    return (
        <div className="card">
            <div className="card-content">
                {creatorFirstName && (
                    <p className="title">
                        From: {creatorFirstName}
                    </p>
                )}
                <hr />
                <p className="subtitle">
                    {note.content}
                </p>
            </div>
            <footer className="card-footer">
                <button className="button is-primary choreButton">Understood!</button>
            </footer>
        </div>
    );
}
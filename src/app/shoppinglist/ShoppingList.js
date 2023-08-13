import React from 'react';

export default function ShoppingList({ shoppingList }) {
    console.log('shoppingList:', shoppingList);

    return (
        <div className="card">
            <div className="card-content">
                <p className="title">
                    {shoppingList.item}
                </p>
                <p className="subtitle">
                    {shoppingList.quantity}
                </p>
                <p className="subtitle">
                    {shoppingList.creator.firstName}
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
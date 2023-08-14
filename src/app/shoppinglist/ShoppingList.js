import React from 'react';

export default function ShoppingList({ shoppingList }) {
    console.log('shoppingList:', shoppingList);

    return (
        <div className="card">
            <div className="card-content">
                <p className="title">
                    {shoppingList.item}
                </p>
                <hr />
                <p className="subtitle">
                    {shoppingList.quantity}
                </p>
                <p className="subtitle">
                    Created by: {shoppingList.creator.firstName}
                </p>
            </div>
            <footer className="card-footer">
                <button className="button is-primary choreButton">Got it!</button>
            </footer>
        </div>
    );
}
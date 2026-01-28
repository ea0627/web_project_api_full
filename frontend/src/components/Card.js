import React from 'react';

function Card({ card }) {
    return (
        <li className="elements__item">
            <img
                className="elements__image"
                src={card.link}
                alt={card.name}
            />
            <div className="elements__description">
                <h2 className="elements__title">{card.name}</h2>
            </div>
        </li>
    );
}

export default Card;

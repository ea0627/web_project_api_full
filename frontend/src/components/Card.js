// frontend/src/components/Card.js
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const likes = Array.isArray(card.likes) ? card.likes : [];

    // likes puede ser array de strings o array de objetos {_id}
    const isLiked = likes.some((like) => like === currentUser._id || like?._id === currentUser._id);

    // owner puede venir como string o como objeto {_id}
    const ownerId = card?.owner?._id || card?.owner;
    const isOwn = ownerId === currentUser._id;

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="elements__item">
            <img className="elements__image" src={card.link} alt={card.name} />

            {/* Mostrar borrar solo si es tu tarjeta */}
            {isOwn && (
                <button
                type="button"
                className="elements__trash"
                onClick={handleDeleteClick}
                aria-label="Eliminar tarjeta"
                />
            )}

            <div className="elements__description">
                <h2 className="elements__title">{card.name}</h2>

                    <div className="elements__like-group">
                        <button
                            type="button"
                            className={`elements__like ${isLiked ? 'elements__like_active' : ''}`}
                            onClick={handleLikeClick}
                            aria-label="Me gusta"
                        />
                        <span className="elements__like-count">{likes.length}</span>
                    </div>
            </div>
        </li>
    );
}

export default Card;
import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar || 'https://via.placeholder.com/120'}
            alt="Avatar"
            className="profile__avatar"
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-text">
            <h1 className="profile__name">{currentUser.name || 'Jacques Cousteau'}</h1>
            <p className="profile__about">{currentUser.about || 'Explorador'}</p>
          </div>

          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {(Array.isArray(cards) ? cards : []).map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
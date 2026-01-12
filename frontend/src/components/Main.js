import React from 'react';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src="https://via.placeholder.com/120"
            alt="Avatar"
            className="profile__avatar"
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">Jacques Cousteau</h1>
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
          {/* cards */}
        </ul>
      </section>
    </main>
  );
}

export default Main;
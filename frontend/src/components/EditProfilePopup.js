import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) return;
    setName(currentUser.name || '');
    setAbout(currentUser.about || '');
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <div className={`popup popup_type_edit-profile ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="Cerrar"
        />

        <h3 className="popup__title">Editar perfil</h3>

        <form className="popup__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="popup__input"
            name="name"
            placeholder="Nombre"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            className="popup__input"
            name="about"
            placeholder="Acerca de mí"
            minLength="2"
            maxLength="30"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />

          <button type="submit" className="popup__save">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePopup;

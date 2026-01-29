import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) return;
    setAvatar('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar);
  }

  return (
    <div className={`popup popup_type_edit-avatar ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="Cerrar"
        />

        <h3 className="popup__title">Cambiar foto de perfil</h3>

        <form className="popup__form" onSubmit={handleSubmit}>
          <input
            type="url"
            className="popup__input popup__input_type_avatar"
            name="avatar"
            placeholder="Enlace a la imagen"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
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

export default EditAvatarPopup;
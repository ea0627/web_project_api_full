import React from 'react';

function InfoTooltip({ isOpen, isSuccess, onClose }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                    aria-label="Cerrar"
                />

                <div
                    className={`popup__icon ${
                        isSuccess ? 'popup__icon_success' : 'popup__icon_error'
                    }`}
                />

                <h2 className="popup__title">
                    {isSuccess
                        ? '¡Correcto! Ya estás registrado.'
                        : 'Algo salió mal. Inténtalo de nuevo.'}
                </h2>
            </div>
        </div>
    );
}

export default InfoTooltip;

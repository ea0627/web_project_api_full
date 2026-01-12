import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, onSignOut, loggedIn }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }

  return (
    <header className={`header ${isMenuOpen ? 'header_opened' : ''}`}>
      {/* MOBILE MENU — solo logueado y abierto */}
      {loggedIn && isMenuOpen && (
        <div className="header__mobile">
          <span className="header__email">{email}</span>
          <button
            type="button"
            className="header__logout"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </button>
        </div>
      )}

      <div className="header__content">
        {/* LOGO */}
        <div className="header__logo">
          Around<span className="header__logo-span">The U.S.</span>
        </div>

        {/* 🔑 LINK AUTH — SOLO EN /signin y /signup */}
        {location.pathname !== '/' && (
          <Link
            to={location.pathname === '/signin' ? '/signup' : '/signin'}
            className="header__link"
          >
            {location.pathname === '/signin'
              ? 'Regístrate'
              : 'Iniciar sesión'}
          </Link>
        )}

        {loggedIn && location.pathname === '/' && (
          <div className="header__user">
            <span className="header__email">{email}</span>
            <button
              type="button"
              className="header__logout"
              onClick={onSignOut}
            >
              Cerrar sesión
            </button>
          </div>
        )}


        {/* 🍔 BOTÓN HAMBURGUESA — SOLO LOGUEADO */}
        {loggedIn && location.pathname === '/' && (
          <button
            type="button"
            className="header__menu-button"
            onClick={toggleMenu}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        )}

      </div>
    </header>
  );
}

export default Header;
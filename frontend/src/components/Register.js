import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister({ email, password });
    }

    return (
        <section className="auth">
            <h2 className="auth__title">Regístrate</h2>

            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                type="email"
                className="auth__input"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <input
                type="password"
                className="auth__input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                />

                <button type="submit" className="auth__submit">
                Regístrate
                </button>
            </form>

            <p className="auth__caption">
                ¿Ya eres miembro?{' '}
                <Link to="/signin" className="auth__link">
                Inicia sesión aquí
                </Link>
            </p>
        </section>
    );
}

export default Register;

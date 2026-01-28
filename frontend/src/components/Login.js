import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin({ email, password });
    }

    return (
        <section className="auth">
            <h2 className="auth__title">Iniciar sesión</h2>

            <form className="auth__form form" onSubmit={handleSubmit}>
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
                />

                <button type="submit" className="auth__submit button">
                Iniciar sesión
                </button>                
            </form>

            <p className="auth__caption">
                ¿Aun no eres miembro?{' '}
                <Link to="/signup" className="auth__link">
                Registrate aquí
                </Link>
            </p>
        </section>
    );
}

export default Login;
import React, { useEffect, useState } from 'react';
import * as auth from '../utils/auth';
import { api } from '../utils/api';

function App() {
    const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

  // ✅ revisa token al cargar
    useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
        if (!storedToken) return;

        setToken(storedToken);
        api.setToken(storedToken);

        api.getUserInfo()
        .then((user) => {
            setCurrentUser(user);
            setLoggedIn(true);
            })
            .catch(() => {
                localStorage.removeItem('jwt');
                setToken('');
                setLoggedIn(false);
            });
    }, []);

  // ✅ login
    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                setToken(data.token);
                api.setToken(data.token);
                setLoggedIn(true);

            return api.getUserInfo();
        })
        .then((user) => setCurrentUser(user))
        .catch(console.error);
    };

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        setToken('');
        setLoggedIn(false);
        setCurrentUser(null);
    };

    return (
        <div>
        {/* aquí tu UI */}
        </div>
    );
}

export default App;

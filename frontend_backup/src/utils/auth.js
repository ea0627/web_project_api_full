const BASE_URL = 'http://localhost:3000';

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(res));

export const register = (email, password) =>
        fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(checkResponse);

export const authorize = (email, password) =>
    fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);

class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
        this._token = '';
    }

    setToken(token) {
        this._token = token;
    }

    _getHeaders() {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this._token}`,
        };
    }

    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(res);
    }

  // Obtener información del usuario
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        }).then(this._handleResponse);
    }

  // Obtener tarjetas iniciales (cuando exista en backend)
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getHeaders(),
        }).then(this._handleResponse);
    }
}

const api = new Api({
    baseUrl: '',
});

export default api;
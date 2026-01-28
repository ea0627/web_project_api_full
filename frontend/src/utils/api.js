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

  // Actualizar nombre y about
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  // ✅ Actualizar avatar
  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    }).then(this._handleResponse);
  }

  // Obtener tarjetas iniciales
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    })
      .then(this._handleResponse)
      .then((res) => (Array.isArray(res) ? res : res.data));
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;

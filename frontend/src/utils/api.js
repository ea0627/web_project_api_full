class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._token = '';
  }

  setToken(token) {
    this._token = token;
  }

  _getHeaders() {
    const token = this._token || localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
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

    // Crear tarjeta
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
  }

  // Borrar tarjeta
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  // Like
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

}

const api = new Api({
  baseUrl: "/api",
});

export default api;

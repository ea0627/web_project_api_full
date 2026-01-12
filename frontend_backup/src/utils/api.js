class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
        this._token = null;
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

    _check(res) {
        return res.ok ? res.json() : Promise.reject(res);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        }).then(this._check);
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({ name, about }),
        }).then(this._check);
    }

  // Cuando agregues cards, aquí también irá Authorization en TODO:
  // getInitialCards(), addCard(), deleteCard(), changeLikeCardStatus(), etc.
}

export const api = new Api({ baseUrl: 'http://localhost:3000' });

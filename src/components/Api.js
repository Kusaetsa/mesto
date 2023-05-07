class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCardsFromServer() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(
        this._checkResponse
      )
  };

  getUserInfoFromServer() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(
        this._checkResponse
      )
  };

  setUserInfoOnServer(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(
        this._checkResponse
      )
  };

  addNewCardOnServer(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
        likes: data.likes
      })
    })
      .then(
        this._checkResponse
      )
  };

  deleteMyCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(
        this._checkResponse
      )
  };

  editAvatarImage(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(
        this._checkResponse
      )
  }

  putLikeOnCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(
        this._checkResponse
      )
  };

  removeLikeFromCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(
        this._checkResponse
      )
  };

}


export default Api;




/*
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }


  getInitialCardsFromServer() {
    this._request(`${this._url}cards`, {
        method: 'GET',
        headers: this._headers
      }
    )
  }

  getUserInfoFromServer() {
    this._request(`${this._url}users/me`, {
        method: 'GET',
        headers: this._headers
      }
    )
  }

  */

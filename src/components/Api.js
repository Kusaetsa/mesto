class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

getInitialCardsFromServer() {
    return fetch(`${this._url}cards`, {
        method: 'GET',
        headers: this._headers
    })
    .then (res => {
        if (res.status === 200) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  };
  
  getUserInfoFromServer() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
  })
  .then (res => {
    if (res.status === 200) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
  .then (res => {
    if (res.status === 200) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
    .then (res => {
      if (res.status === 200) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

  };

  deleteMyCard(id) {
    return fetch (`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (res => {
      if (res.status === 200) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  };

  editAvatarImage(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
  })
  .then (res => {
    if (res.status === 200) {
        return res.json();
    }
    return Promise.reject(`Ошибка api: ${res.status}`);
  })
  }

  putLikeOnCard(id) {
    return fetch (`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then (res => {
      if (res.status === 200) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  };

  removeLikeFromCard(id) {
    return fetch (`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (res => {
      if (res.status === 200) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  };

}


export default Api;
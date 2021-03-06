export class Api{
  constructor({url, headers}){
    this.url = url;
    this.headers = headers;
  }

  _getResponseData(res){    
      if(res.ok){
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getUserInfo(){
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  getCardsFromServer(){
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  changeUserInfo(items){
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(items)
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  changeAvatar(items){
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(items)
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  addNewCard(items){
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(items)
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  deleteCard(id){
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  likeCard(id){
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  deleteLikeCard(id){
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }
}
export class Api{
  constructor({url, headers}){
    this.url = url;
    this.headers = headers;
  }

  getUserInfo(){
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
    .then(res => res.json())
    // .then((result) => {
      
    // });
  }

  getCardsFromServer(){
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    .then(res => res.json())
    // .then((result) => {
     
    // });
  }

  changeUserInfo(items){
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(items)
    });
  }

  addNewCard(items){
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(items)
    });
  }

  deleteCard(id){
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  likeCard(id){
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
  }

  deleteLikeCard(id){
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }
}
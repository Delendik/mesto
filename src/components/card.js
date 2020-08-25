export class Card {
  constructor({name, url, likes, userId, selector, handleCardLike, handleCardRemove, handleCardClick}){
    this._name = name;
    this._url = url;
    this._likes = likes;
    this._userId = userId;
    this._selector = selector;
    this._handleCardLike = handleCardLike;
    this._handleCardRemove = handleCardRemove;
    this._handleCardClick = handleCardClick;
  }

  likeCard = (evt) => {
    evt.target.classList.toggle('card__like_black');
  };

  removeCard =  (evt) => {
    evt.target.closest('.card').remove();
  };

  // removeCard (id){
  //   document.querySelector('.card__like').remove();
  // };

  _buttonListeners () {
    this._element.querySelector('.card__like').addEventListener('click', this._handleCardLike);
    this._element.querySelector('.card__trash').addEventListener('click', this._handleCardRemove);
    this._element.querySelector('.card__picture').addEventListener('click', this._handleCardClick);
  };  

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.cloneNode(true);
    return cardElement;
  }

  checkLike(){
    this._element = this._getTemplate();
    const cardLikesColor = this._element.querySelector('.card__like');
    this._likes.forEach(element => {
      if(element._id.includes('c3c0bd097c2770d7add759cc')){
        cardLikesColor.classList.add('card__like_black');
      }
    });
  }

  createCard(){
    this._element = this._getTemplate();
    if(this._userId!='c3c0bd097c2770d7add759cc'){
      const cardTrash = this._element.querySelector('.card__trash');
      cardTrash.style.display='none';
      cardTrash.setAttribute('disabled', true);
    }
    const cardTitle = this._element.querySelector('.card__title');
    const cardLink = this._element.querySelector('.card__picture');
    const cardLikes = this._element.querySelector('.card__likeNumbers');
    const cardLikesColor = this._element.querySelector('.card__like');
    cardTitle.textContent = this._name;
    cardLink.src = this._url;
    cardLikes.textContent = this._likes.length;
    this._likes.forEach(element => {
      if(element._id.includes('c3c0bd097c2770d7add759cc')){
        cardLikesColor.classList.add('card__like_black');
      }
    });
    this._buttonListeners();
    return this._element;
  }
}
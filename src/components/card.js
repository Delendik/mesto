export class Card {
  constructor(text, url, selector, handleCardClick){
    this._text = text;
    this._url = url;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _likeCard = (evt) => {
    evt.target.classList.toggle('card__like_black');
  };

  _removeCard =  (evt) => {
    evt.target.closest('.card').remove();
  };

  _buttonListeners () {
    this._element.querySelector('.card__like').addEventListener('click', this._likeCard);
    this._element.querySelector('.card__trash').addEventListener('click', this._removeCard);
    this._element.querySelector('.card__picture').addEventListener('click', this._handleCardClick);
  };  

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.cloneNode(true);
    return cardElement;
  }

  createCard(){
    this._element = this._getTemplate();
    const cardTitle = this._element.querySelector('.card__title');
    const cardLink = this._element.querySelector('.card__picture');
    cardTitle.textContent = this._text;
    cardLink.src = this._url;
    this._buttonListeners();
    return this._element;
  }
}
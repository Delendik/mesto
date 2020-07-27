import {openPopup} from './index.js';
export class Card {
  constructor(text, url, selector){
    this._text = text;
    this._url = url;
    this._selector = selector;
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
    this._element.querySelector('.card__picture').addEventListener('click', this._openPicture);
  };  
    
  _openPicture = (evt) => {
    this._card = evt.target.closest('.card');
    this._link = this._card.querySelector('.card__picture');
    this._title = this._card.querySelector('.card__title');
    this._linkOfPicture = document.querySelector('.popupPicture__image');
    this._titleOfPicture = document.querySelector('.popupPicture__title');
    this._popupOpenPicture = document.querySelector('.popupPicture');
    this._linkOfPicture.src = this._link.src;
    this._titleOfPicture.textContent = this._title.textContent;
    openPopup(this._popupOpenPicture);
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.cloneNode(true);
    return cardElement;
  }

  createCard(){
    this._element = this._getTemplate();
    const cardList = document.querySelector('.cardsList');
    const cardTitle = this._element.querySelector('.card__title');
    const cardLink = this._element.querySelector('.card__picture');
    cardTitle.textContent = this._text;
    cardLink.src = this._url;
    this._buttonListeners();
    return this._element;
  }
};
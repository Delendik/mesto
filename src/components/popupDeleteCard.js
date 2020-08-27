import {Popup} from './popup.js';

export class PopupDeleteCard extends Popup{
  constructor(popupSelector, handleDelete){
    super(popupSelector);
  }

  setSubmitHandler(func){
    this._popupSelector.querySelector('.popup__formDeletePicture').addEventListener('submit', (evt) => {
      evt.preventDefault();
      func();
    })  
  }
}
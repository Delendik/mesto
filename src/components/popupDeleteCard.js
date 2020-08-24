import {Popup} from './popup.js';

export class PopupDeleteCard extends Popup{
  constructor(popupSelector, handleDelete){
    super(popupSelector);
    this._handleDelete = handleDelete;
    this.setEventListeners();
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__formDeletePicture').addEventListener('submit', (evt) => {
      evt.preventDefault();
      evt._handleDelete();
    })  
  }
}
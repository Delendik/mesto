import {Popup} from './popup.js';

export class PopupAvatar extends Popup{
  constructor(popupSelector, handleFormAvatar){
    super(popupSelector);
    this._handleFormAvatar = handleFormAvatar;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormAvatar(this._getInputValues());
      this._popupSelector.querySelector('.popup__form').reset();
    })
  }

  _getInputValues() {    
    return this._inputList = this._popupSelector.querySelector('.popup__input');
  }
}
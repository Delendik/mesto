import {Popup} from './popup.js';

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }

  open (name, link)  {
    super.open();
    this._linkOfPicture = document.querySelector('.popupPicture__image');
    this._titleOfPicture = document.querySelector('.popupPicture__title');
    this._linkOfPicture.alt = name;
    this._linkOfPicture.src = link;
    this._titleOfPicture.textContent = name;
  }

  close(){
    super.close();
  }

}
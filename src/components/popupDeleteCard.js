import {Popup} from './popup.js';

export class PopupDeleteCard extends Popup{
  constructor(popupSelector, handleDelete){
    super(popupSelector);
    // this._handleDelete = handleDelete;
    //this.setEventListeners();
  }
  
  open(){
    super.open();
    //setEventListeners()
  }

  setSubmitHandler(func){
    this._popupSelector.querySelector('.popup__formDeletePicture').addEventListener('submit', (evt) => {
      evt.preventDefault();
      //console.log('hi');
      //api.deleteCard(item);
      func();
    })  
  }

  setEventListeners() {
    super.setEventListeners();
    // this._popupSelector.querySelector('.popup__formDeletePicture').addEventListener('submit', (evt) => {
    //   evt.preventDefault();
    //   console.log('hi');
    // })  
  }
}
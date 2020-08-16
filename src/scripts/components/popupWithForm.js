import {Popup} from './popup.js';
import {FormValidator} from './validate.js';
import {config} from '../utils/config.js';

const formSelectorAddPicture = document.querySelector('.popup__formAddPicture');
const formValidatorAddPicture = new FormValidator(config, formSelectorAddPicture);

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(){ 
    super.open();
  }

  close(){
    super.close();
    this.formElementNameOfPlace = document.querySelector('.popup__nameOfPlace');
    this.formElementLinkForPicture = document.querySelector('.popup__linkForPicture');
    this.formElementNameOfPlace.value = '';
    this.formElementLinkForPicture.value = '';
    formValidatorAddPicture.resetForm();
  }

  setEventListeners() {
  
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
}
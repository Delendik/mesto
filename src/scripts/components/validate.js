export class FormValidator {
  constructor(config, formElement){
    this._formSelector = config.formSelector;
    this._buttonElement = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputSelector = config.inputSelector;
    this._formElement = formElement;
  };

  _showError = (inputElement, errorMessage) => {
    this.inputElement.classList.add('popup__input_type_error');
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  };
  
  _hideError = (inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  };
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };
  
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    const buttonElement = this._formElement.querySelector(this._buttonElement);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement)=>{
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
    });
  };
  
  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      this._setEventListeners();
  };
  
  resetForm = () => {
    const inputList = this._formElement.querySelectorAll(this._inputSelector);
    inputList.forEach((inputElement) => {
        this._hideError(inputElement);
    });
  }

  _popupErrorUpdate(form) {
    const inputsArray = Array.from(form.querySelectorAll('.popup__input'));
    inputsArray.forEach((inputElement) => {
      this._hideInputError(inputElement, validationParams);
    });
  };
  
  _hasInvalidInput = (inputList)=>{
    return inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    });
  };
  
  _toggleButtonState = (inputList, buttonElement)=>{
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save_inactive');
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove('popup__save_inactive');
      buttonElement.removeAttribute('disabled');
    }
  };
}

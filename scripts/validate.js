// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save',
//   inactiveButtonClass: 'popup__save_inactive',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

const showError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add('popup__input_type_error');
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideError = (formElement, inputElement) => {
  inputElement.classList.remove('popup__input_type_error');
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const setEventListeners = (formElement)=>{
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement)=>{
      inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
      });
   
  });
};

const enableValidation = ()=>{
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);
});
}

const hasInvalidInput = (inputList)=>{
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement)=>{
  if (hasInvalidInput(inputList)) {
   buttonElement.classList.add('popup__save_inactive');
 } else {
 buttonElement.classList.remove('popup__save_inactive');
 }
};

enableValidation();
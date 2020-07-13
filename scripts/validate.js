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

const enableValidation = ({formSelector})=>{
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const clearError = ({formSelector})=>{
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement)=>{
      hideError(formElement, inputElement);
        });
    });
  };

  function popupErrorUpdate(form) {
    const inputsArray = Array.from(form.querySelectorAll('.popup__input'));
    inputsArray.forEach((inputElement) => {
        hideInputError(inputElement, validationParams);
    });
};

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


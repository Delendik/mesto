let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button');
let popupCloseButton = popup.querySelector('.popup__close');

let popupToggle = function() {
  popup.classList.toggle('popup__opened');
  console.log(popup);
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

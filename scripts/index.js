let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button');
let popupCloseButton = popup.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupSaveButton = popup.querySelector('.popup__save');

let popupName = popup.querySelector('.popup__name');
let popupAbout = popup.querySelector('.popup__about');

let popupToggle = function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  popup.classList.toggle('popup__opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);



let editProfile = function(){
  profileName.textContent=popupName.value;
  profileAbout.textContent = popupAbout.value;
  popupToggle();
}

popupSaveButton.addEventListener('click', editProfile);




const popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button');
let popupCloseButton = popup.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
let popupSaveButton = popup.querySelector('.popup__save');

const popupName = popup.querySelector('.popup__name');
const popupAbout = popup.querySelector('.popup__about');

const popupToggle = function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  popup.classList.toggle('popup__opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

const editProfile = function(){
  profileName.textContent=popupName.value;
  profileAbout.textContent = popupAbout.value;
  popupToggle();
}

popupSaveButton.addEventListener('click', editProfile);




import {initialCards} from './initialCards.js';
import {Card} from './card.js';
import {FormValidator} from './validate.js';
import {config} from './config.js';

initialCards.forEach(item=>{
  const cardList = document.querySelector('.cardsList');
  const card = new Card(item.name, item.link, '.templateCard');
  const newCard = card.createCard();
  cardList.prepend(newCard);
});

const templateCard = document.querySelector('.templateCard');
const cardList = document.querySelector('.cardsList');

const popupOpenPicture = document.querySelector('.popupPicture');
const linkOfPicture = document.querySelector('.popupPicture__image');
const titleOfPicture = document.querySelector('.popupPicture__title');

const popupClosePicture = popupOpenPicture.querySelector('.popup__close');

const popupAddCard = document.querySelector('.popupAddCard');
const popupOpenButtonAddPicture = document.querySelector('.profile__addPicture');
const popupCloseButtonAddPicture = popupAddCard.querySelector('.popup__close');

const buttonListeners = function (card) {
  card.querySelector('.card__like').addEventListener('click', likeCard);
  card.querySelector('.card__trash').addEventListener('click', removeCard);
  card.querySelector('.card__picture').addEventListener('click', openPicture);
}; 

const addNewCard = function(evt){
  evt.preventDefault();
  const name = popupAddCard.querySelector('.popup__nameOfPlace').value;
  const link = popupAddCard.querySelector('.popup__linkForPicture').value;
  const card = new Card(name, link, '.templateCard');
  const newCard = card.createCard();
  cardList.prepend(newCard);
  popupAddCard.querySelector('.popup__nameOfPlace').value = '';
  popupAddCard.querySelector('.popup__linkForPicture').value = '';
  closePopup(popupAddCard);
};

const formElementAddCard = popupAddCard.querySelector('.popup__form');

const popupEditProfile = document.querySelector('.popupEditProfile');
const popupOpenButton = document.querySelector('.profile__button');
const popupCloseButton = popupEditProfile.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const popupName = popupEditProfile.querySelector('.popup__name');
const popupAbout = popupEditProfile.querySelector('.popup__about');

const popupOpenToggle = function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
};

const formElement = popupEditProfile.querySelector('.popup__form');

const editProfile = function(evt){
  evt.preventDefault();
  profileName.textContent=popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup(popupEditProfile);
};

export const openPopup = function (popup) {  
  document.addEventListener('keydown', keyPress);
  popup.classList.add('popup_opened');
  const saveButton = popupEditProfile.querySelector('.popup__save');
  saveButton.classList.remove('popup__save_inactive');
  formValidatorEditProfile.resetForm ();
  formValidatorAddPicture.resetForm ();
  
};

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyPress);
};

function keyPress (evt) {
  if(evt.key === "Escape") {
    closePopup(popupEditProfile);
    closePopup(popupAddCard);
    closePopup(popupOpenPicture);
  }
}

const formSelectorEditProfile = document.querySelector('.popup__formEditProfile');
const formSelectorAddPicture = document.querySelector('.popup__formAddPicture');
const formValidatorAddPicture = new FormValidator(config, formSelectorAddPicture);
const formValidatorEditProfile = new FormValidator(config, formSelectorEditProfile);

formElement.addEventListener('submit', editProfile);
formElement.addEventListener('submit', formValidatorEditProfile.enableValidation());

popupClosePicture.addEventListener('click', () => closePopup(popupOpenPicture));
popupOpenPicture.addEventListener('mousedown', (evt) => closePopup(evt.target));

popupOpenButtonAddPicture.addEventListener('click', () => openPopup(popupAddCard));
popupCloseButtonAddPicture.addEventListener('click', () => closePopup(popupAddCard));
popupAddCard.addEventListener('mousedown', (evt) => closePopup(evt.target));

formElementAddCard.addEventListener('submit', addNewCard);
formElementAddCard.addEventListener('submit', formValidatorAddPicture .enableValidation());

popupOpenButton.addEventListener('click', popupOpenToggle);
popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupEditProfile.addEventListener('mousedown', (evt) => closePopup(evt.target));


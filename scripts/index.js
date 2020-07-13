const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: '.popup__save_inactive',
  inputError: '.popup__input_error',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__error_visible'};

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

const likeCard = function (evt) {
  evt.target.classList.toggle('card__like_black');
};

const removeCard = function (evt) {
  const card = evt.target.closest('.card');
  card.remove();
};

const openPicture = function(evt) {
  const card = evt.target.closest('.card');
  const link = card.querySelector('.card__picture');
  const title = card.querySelector('.card__title');
  linkOfPicture.src = link.src;
  titleOfPicture.textContent = title.textContent;
  openPopup(popupOpenPicture);
};

const addCard = function(name, link) {
  const cards = templateCard.content.cloneNode(true);
  const cardTitle = cards.querySelector('.card__title');
  const cardLink = cards.querySelector('.card__picture');
  cardTitle.textContent = name;
  cardLink.src = link;
  buttonListeners(cards);
  cardList.prepend(cards);
};

const addNewCard = function(evt){
  evt.preventDefault();
  name = popupAddCard.querySelector('.popup__nameOfPlace').value;
  link = popupAddCard.querySelector('.popup__linkForPicture').value
  addCard(name, link);
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

const openPopup = function (popup) {
  clearError(config);
  popup.classList.add('popup_opened');
};

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
};

function keyPress (evt) {
  if(evt.key === "Escape") {
    closePopup(popupEditProfile);
    closePopup(popupAddCard);
    closePopup(popupOpenPicture);
  }
}

initialCards.forEach(item=>{
  addCard(item.name, item.link);
});

formElement.addEventListener('submit', editProfile);

popupClosePicture.addEventListener('click', () => closePopup(popupOpenPicture));
popupOpenPicture.addEventListener('mousedown', (evt) => closePopup(evt.target));

popupOpenButtonAddPicture.addEventListener('click', () => openPopup(popupAddCard));
popupCloseButtonAddPicture.addEventListener('click', () => closePopup(popupAddCard));
popupAddCard.addEventListener('mousedown', (evt) => closePopup(evt.target));

formElementAddCard.addEventListener('submit', addNewCard);

popupOpenButton.addEventListener('click', popupOpenToggle);
popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupEditProfile.addEventListener('mousedown', (evt) => closePopup(evt.target));

document.addEventListener('keydown', (evt) => keyPress(evt));

enableValidation(config);
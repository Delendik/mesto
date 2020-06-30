const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const templateCard = document.querySelector('.templateCard');
const cardList = document.querySelector('.cardsList');

const buttonListeners = function (card) {
  card.querySelector('.card__like').addEventListener('click', likeCard);
  card.querySelector('.card__trash').addEventListener('click', removeCard);
  card.querySelector('.card__picture').addEventListener('click', OpenPicture);
} 

const likeCard = function (evt) {
  evt.target.classList.toggle('card__like_black');
}

const removeCard = function (evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

const popupOpenPicture = document.querySelector('.popupPicture');
const linkOfPicture = document.querySelector('.popupPicture__image');
const titleOfPicture = document.querySelector('.popupPicture__title');

const OpenPicture = function(evt) {
  const card = evt.target.closest('.card');
  const link = card.querySelector('.card__picture');
  const title = card.querySelector('.card__title');
  linkOfPicture.src = link.src;
  titleOfPicture.textContent = title.textContent;
  popupOpenPicture.classList.toggle('popup__opened');
}

const popupClosePicture = popupOpenPicture.querySelector('.popup__close');

const ClosePicture = function() {
  popupOpenPicture.classList.toggle('popup__opened');
}

popupClosePicture.addEventListener('click', ClosePicture);

function addCard(name, link) {
  const cards = templateCard.content.cloneNode(true);
  const cardTitle = cards.querySelector('.card__title');
  const cardLink = cards.querySelector('.card__picture');
  cardTitle.textContent = name;
  cardLink.src = link;
  buttonListeners(cards);
  cardList.prepend(cards);
}

if(initialCards==false){
  document.querySelector('.cardsList__empty').style.display='flex';
  document.querySelector('.cardsList').style.display='flex';
}else{
  initialCards.forEach(item=>{
    addCard(item.name, item.link);
  });
}

const popupAddCard = document.querySelector('.popupAddCard');
let popupOpenButtonAddPicture = document.querySelector('.profile__addPicture');
let popupCloseButtonAddPicture = popupAddCard.querySelector('.popup__close');

const popupToggleAddCard = function() {
  popupAddCard.querySelector('.popup__nameOfPlace').value = 'Название';
  popupAddCard.querySelector('.popup__linkForPicture').value = "Ссылка на картинку";
  popupAddCard.classList.toggle('popup__opened');
}

popupOpenButtonAddPicture.addEventListener('click', popupToggleAddCard);
popupCloseButtonAddPicture.addEventListener('click', popupToggleAddCard);

const addNewCard = function(evt){
  evt.preventDefault();
  name = popupAddCard.querySelector('.popup__nameOfPlace').value;
  link = popupAddCard.querySelector('.popup__linkForPicture').value
  addCard(name, link);
  popupToggleAddCard();
}

let formElementAddCard = popupAddCard.querySelector('.popup__form');
let popupButtonSaveCard = popupAddCard.querySelector('.popup__save');

popupButtonSaveCard.addEventListener('click', addNewCard);

const popupEditProfile = document.querySelector('.popupEditProfile');
let popupOpenButton = document.querySelector('.profile__button');
let popupCloseButton = popupEditProfile.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
let popupSaveButton = popupEditProfile.querySelector('.popup__save');

const popupName = popupEditProfile.querySelector('.popup__name');
const popupAbout = popupEditProfile.querySelector('.popup__about');

const popupToggle = function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  popupEditProfile.classList.toggle('popup__opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

let formElement = popupEditProfile.querySelector('.popup__form');

const editProfile = function(evt){
  evt.preventDefault();
  profileName.textContent=popupName.value;
  profileAbout.textContent = popupAbout.value;
  popupToggle();
}

formElement.addEventListener('submit', editProfile);
popupSaveButton.addEventListener('click', editProfile);





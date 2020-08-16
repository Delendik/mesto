import {initialCards} from '../scripts/utils/initialCards.js';
import {Card} from '../scripts/components/card.js';
import {FormValidator} from '../scripts/components/validate.js';
import {config} from '../scripts/utils/config.js';
import {Section} from '../scripts/components/section.js';
import {Popup} from '../scripts/components/popup.js';
import {PopupWithImage} from '../scripts/components/popupWithImage.js';
import {PopupWithForm} from '../scripts/components/popupWithForm.js';
import {UserInfo} from '../scripts/components/userInfo.js';
import {
  cardList,
  popupOpenButtonAddPicture,
  formElementAddCard,
  popupOpenButton,
  formElement,
  formSelectorEditProfile,
  formSelectorAddPicture,
  popupName,
  popupAbout
} from '../scripts/utils/constants.js'
import './index.css';

const formValidatorAddPicture = new FormValidator(config, formSelectorAddPicture);
const formValidatorEditProfile = new FormValidator(config, formSelectorEditProfile);

const openPicture = new PopupWithImage('.popupPicture');

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.templateCard', () => openPicture.open(item.name, item.link));
    const cardElement = card.createCard();
    defaultCardList.addItem(cardElement);
  }
}, cardList);

defaultCardList.renderer();

const addNewCard = new PopupWithForm(
  '.popupAddCard',
  (item) => {
    const card = new Card(item.name, item.link, '.templateCard', () => openPicture.open(name, link));
    const cardElement = card.createCard();
    defaultCardList.addItem(cardElement);
    addNewCard.close();
    } 
);

const popupEdit = new Popup ('.popupEditProfile');

const userInfo = new UserInfo({nameSelector:'.profile__name', aboutSelector:'.profile__about'});

popupOpenButton.addEventListener('click', () =>  {
  const userInfoResult=userInfo.getUserInfo();
  popupName.value = userInfoResult.name;
  popupAbout.value = userInfoResult.about;
  formValidatorEditProfile.resetForm();
  popupEdit.open();
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  popupEdit.close();
  userInfo.setUserInfo(popupName.value, popupAbout.value);
});

formElementAddCard.addEventListener('submit', formValidatorAddPicture.enableValidation());
formElement.addEventListener('submit', formValidatorEditProfile.enableValidation());

popupOpenButtonAddPicture.addEventListener('click', () =>  addNewCard.open());
import {initialCards} from '../utils/initialCards.js';
import {Card} from '../components/card.js';
import {FormValidator} from '../components/formValidator.js';
import {config} from '../utils/config.js';
import {Section} from '../components/section.js';
import {Popup} from '../components/popup.js';
import {PopupWithImage} from '../components/popupWithImage.js';
import {PopupWithForm} from '../components/popupWithForm.js';
import {UserInfo} from '../components/userInfo.js';
import {
  cardList,
  popupOpenButtonAddPicture,
  popupOpenButton,
  formElement,
  formElementAddCard,
  formSelectorEditProfile,
  formSelectorAddPicture,
  popupName,
  popupAbout,
  buttonProfile
} from '../utils/constants.js'
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
  formValidatorEditProfile.enableValidation();
  
  const userInfoResult=userInfo.getUserInfo();
  popupName.value = userInfoResult.name;
  popupAbout.value = userInfoResult.about;
  formValidatorEditProfile.resetForm();
  popupEdit.open();
  formValidatorEditProfile.activateProfileButton(buttonProfile);
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  popupEdit.close();
  userInfo.setUserInfo(popupName.value, popupAbout.value);
});

popupOpenButtonAddPicture.addEventListener('click', () =>  {
  formValidatorAddPicture.resetForm(); 
  formElementAddCard.reset();
  addNewCard.open(); 
  formValidatorAddPicture.enableValidation();
});
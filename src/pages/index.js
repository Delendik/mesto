import {initialCards} from '../utils/initialCards.js';
import {Card} from '../components/card.js';
import {FormValidator} from '../components/formValidator.js';
import {config} from '../utils/config.js';
import {Section} from '../components/section.js';
import {Popup} from '../components/popup.js';
//import {PopupAvatar} from '../components/popupAvatar.js';
import {PopupWithImage} from '../components/popupWithImage.js';
import {PopupWithForm} from '../components/popupWithForm.js';
import {PopupDeleteCard} from '../components/popupDeleteCard.js';
import {UserInfo} from '../components/userInfo.js';
import {Api} from '../components/api.js';
import {
  cardList,
  popupOpenButtonAddPicture,
  popupOpenButtonEditProfileAvatar,
  popupOpenButton,
  formElement,
  formElementAddCard,
  formSelectorEditProfile,
  formSelectorAddPicture,
  formSelectorEditProfileAvatar,
  popupName,
  popupAbout,
  buttonProfile,
  buttonCard
  // buttonDeleteCard
} from '../utils/constants.js'
import './index.css';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    'Content-Type': 'application/json',
    authorization: '2211156a-197b-42d9-becd-f429311725f7'
  }
})
//api.changeUserInfo();
//api.addNewCard();
api.getUserInfo().then(items =>{
  document.querySelector('.profile__name').textContent=items.name;
  document.querySelector('.profile__about').textContent=items.about;
})

const deleteCardOnPage = new PopupDeleteCard(
  '.popupDeleteCard'
);
deleteCardOnPage.setEventListeners();
// deleteCardOnPage.setSubmitHandler(() => {
//   api.deleteCard(item._id);
// });

api.getCardsFromServer().then(data =>{
  const defaultCardList = new Section({
    items: data,
    renderer: (item) => {
      const card = new Card({name:item.name, url:item.link, likes:item.likes, userId:item.owner._id, selector:'.templateCard', 
      handleCardLike: (evt) => {
          if(evt.target.classList.contains('card__like_black')){
            card.likeCard(evt);
            evt.target.closest('.card').querySelector('.card__likeNumbers').textContent = (item.likes.length-1);
            api.deleteLikeCard(item._id);
            
          }else{
            card.likeCard(evt);
            evt.target.closest('.card').querySelector('.card__likeNumbers').textContent = (item.likes.length+1);
            api.likeCard(item._id);
          }  
        }, 
        handleCardRemove: () => {
          deleteCardOnPage.setSubmitHandler({func:api.deleteCard(item._id)});
          deleteCardOnPage.open();
        }, 
        handleCardClick: () => {
          openPicture.open(item.name, item.link);
        }});
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    }
  }, cardList);
  
  defaultCardList.renderer();
});

const formValidatorAddPicture = new FormValidator(config, formSelectorAddPicture);
const formValidatorEditProfile = new FormValidator(config, formSelectorEditProfile);
const formValidatorEditProfileAvatar = new FormValidator(config, formSelectorEditProfileAvatar);

const openPicture = new PopupWithImage('.popupPicture');

const addNewCard = new PopupWithForm(
  '.popupAddCard',
  (item) => {
    buttonCard.textContent = 'Сохранение...';
    const card = new Card({name:item.name, url:item.link, likes:[], userId:'c3c0bd097c2770d7add759cc', selector:'.templateCard', 
      handleCardLike: (evt) => {
      if(evt.target.classList.contains('card__like_black')){
        card.likeCard(evt);
        evt.target.closest('.card').querySelector('.card__likeNumbers').textContent = 0;
        api.deleteLikeCard(item._id);
        
      }else{
        card.likeCard(evt);
        evt.target.closest('.card').querySelector('.card__likeNumbers').textContent = 1;
        api.likeCard(item._id);
      }  
    }, 
      handleCardRemove: () => {
        deleteCardOnPage.setSubmitHandler({func:api.deleteCard(item._id)});
        deleteCardOnPage.open();
      }, 
      handleCardClick: () => {
        openPicture.open(item.name, item.link);
      }});
    const cardElement = card.createCard();
    cardList.append(cardElement);
    api.addNewCard({name:item.name, link:item.link});
    addNewCard.close();
    } 
);

const popupEdit = new Popup ('.popupEditProfile');
const popupEditAvatar = new Popup ('.popupEditProfileAvatar');

const userInfo = new UserInfo({nameSelector:'.profile__name', aboutSelector:'.profile__about'});

openPicture.setEventListeners();
addNewCard.setEventListeners();
popupEdit.setEventListeners();
popupEditAvatar.setEventListeners();

popupOpenButtonEditProfileAvatar.addEventListener('click', () =>  { 
  console.log('hi');
  popupEditAvatar.open();
});

popupOpenButton.addEventListener('click', () =>  {  
  const userInfoResult=userInfo.getUserInfo();
  popupName.value = userInfoResult.name;
  popupAbout.value = userInfoResult.about;
  formValidatorEditProfile.resetForm();
  popupEdit.open();
  formValidatorEditProfile.activateProfileButton(buttonProfile);
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  buttonProfile.textContent = 'Сохранение...';
  popupEdit.close();
  userInfo.setUserInfo(popupName.value, popupAbout.value);
  api.changeUserInfo({name:popupName.value, about:popupAbout.value});
});

popupOpenButtonAddPicture.addEventListener('click', () =>  {
  formValidatorAddPicture.resetForm(); 
  formElementAddCard.reset();
  addNewCard.open(); 
});

formValidatorEditProfile.enableValidation();
formValidatorAddPicture.enableValidation();
formValidatorEditProfileAvatar.enableValidation();
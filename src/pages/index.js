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
  popupOpenButton,
  formElement,
  formElementAddCard,
  formSelectorEditProfile,
  formSelectorAddPicture,
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

api.getCardsFromServer().then(itemses =>{
  const defaultCardList = new Section({
    items: itemses,
    renderer: (item) => {
      const card = new Card(item.name, item.link, item.likes, item.owner._id, '.templateCard', 
        (evt) => {
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
        () => {
          const deleteCard = new PopupDeleteCard(
            '.popupDeleteCard',
            api.deleteCard(item._id)
          );
          deleteCard.open(item._id);
        }, 
        () => {
          openPicture.open(item.name, item.link);
        });
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    }
  }, cardList);
  
  defaultCardList.renderer();
});

const formValidatorAddPicture = new FormValidator(config, formSelectorAddPicture);
const formValidatorEditProfile = new FormValidator(config, formSelectorEditProfile);

const openPicture = new PopupWithImage('.popupPicture');

const addNewCard = new PopupWithForm(
  '.popupAddCard',
  (item) => {
    buttonCard.textContent = 'Сохранение...';
    const card = new Card(item.name, item.link, [], 'c3c0bd097c2770d7add759cc', '.templateCard', 
    (evt) => {
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
      () => {
        const deleteCard = new PopupDeleteCard(
          '.popupDeleteCard',
            api.deleteCard(item._id)
        );
        deleteCard.open(item._id);
      }, 
      () => {
        openPicture.open(item.name, item.link);
      });
    const cardElement = card.createCard();
    cardList.append(cardElement);
    api.addNewCard({name:item.name, link:item.link});
    addNewCard.close();
    } 
);

const popupEdit = new Popup ('.popupEditProfile');

const userInfo = new UserInfo({nameSelector:'.profile__name', aboutSelector:'.profile__about'});

openPicture.setEventListeners();
addNewCard.setEventListeners();
popupEdit.setEventListeners();

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
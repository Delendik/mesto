import {Card} from '../components/card.js';
import {FormValidator} from '../components/formValidator.js';
import {config} from '../utils/config.js';
import {Section} from '../components/section.js';
import {Popup} from '../components/popup.js';
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
  formElementAvatar,
  formElementAddCard,
  formSelectorEditProfile,
  formSelectorAddPicture,
  formSelectorEditProfileAvatar,
  popupName,
  popupAbout,
  popupAvatar,
  buttonProfile,
  buttonProfileAvatar,
  buttonCard,
  profileName,
  profileAbout,
  profileImage
} from '../utils/constants.js'
import './index.css';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    'Content-Type': 'application/json',
    authorization: '2211156a-197b-42d9-becd-f429311725f7'
  }
})

const renderLoading = (loading, selector) =>{
  selector.textContent = loading ? 'Сохранение...' : selector==buttonCard ? 'Создать' : 'Сохранить';
}

const deleteCardOnPage = new PopupDeleteCard(
  '.popupDeleteCard'
);
deleteCardOnPage.setEventListeners();

//функция создания карточки
const newCard = (item, myId) =>{
  const card = new Card(item, {
    selector:'.templateCard', 
    handleCardLike: (evt) => {
      if(evt.target.classList.contains('card__like_black')){                        
        api.deleteLikeCard(item._id)
        .then(() =>{
          card.likeCard(evt); 
          card.removeLike(evt.target);
        })
        .catch((err) => {
          console.log(err); 
        });
      }else{                       
        api.likeCard(item._id)
        .then(() =>{
          card.likeCard(evt);  
          card.addLike(evt.target);
        })
        .catch((err) => {
          console.log(err); 
        });
      }  
    }, 

    handleCardRemove: (evt) => {
      deleteCardOnPage.open();
      deleteCardOnPage.setSubmitHandler(()=>{
        api.deleteCard(item._id)
        .then(() =>{
          card.removeCard(evt);
          deleteCardOnPage.close();
        })
        .catch((err) => {
          console.log(err); 
        });
      });
      
    }, 

    handleCardClick: () => {
      openPicture.open(item.name, item.link);
    },
    myuserId:myId
  });
  return card;
}

//отрисовка карточек с сервера
Promise.all([
  api.getUserInfo(),
  api.getCardsFromServer()
])
  .then(
    json=>{
    const [userInfo, data] = json;
    profileName.textContent=userInfo.name;
    profileAbout.textContent=userInfo.about;
    profileImage.src=userInfo.avatar;
    const defaultCardList = new Section({
      items: data,
      renderer: (item) => {
        const cardElement = newCard(item, userInfo._id).renderCard();
        defaultCardList.addItem(cardElement); 
      }
    }, cardList);   
    defaultCardList.renderer();
  })
  .catch((err) => {
    console.log(err); 
  });

//отрисовка новой карточки
const addNewCard = new PopupWithForm(
  '.popupAddCard',
  (item) => {
    renderLoading(true, buttonCard)
    api.addNewCard(item)
    .then((res) =>{
      const cardElement = newCard(res, userInfo._id).createCard();
      cardList.append(cardElement);
      addNewCard.close();
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(()=>renderLoading(false, buttonCard))
  } 
);

const formValidatorAddPicture = new FormValidator(config, formSelectorAddPicture);
const formValidatorEditProfile = new FormValidator(config, formSelectorEditProfile);
const formValidatorEditProfileAvatar = new FormValidator(config, formSelectorEditProfileAvatar);

const openPicture = new PopupWithImage({
  popupSelector:'.popupPicture', 
  linkOfPicture:'.popupPicture__image', 
  titleOfPicture:'.popupPicture__title'
});

const popupEdit = new Popup ('.popupEditProfile');
const popupEditAvatar = new Popup ('.popupEditProfileAvatar');

const userInfo = new UserInfo({nameSelector:'.profile__name', aboutSelector:'.profile__about', avatarSelector: '.profile__image'});

openPicture.setEventListeners();
addNewCard.setEventListeners();
popupEdit.setEventListeners();
popupEditAvatar.setEventListeners();

popupOpenButtonEditProfileAvatar.addEventListener('click', () =>  { 
  const userInfoResult=userInfo.getUserInfo();
  popupAvatar.value = userInfoResult.avatar.src;
  formValidatorEditProfileAvatar.resetForm();
  popupEditAvatar.open();
  formValidatorEditProfileAvatar.activateProfileButton(buttonProfileAvatar);
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
  renderLoading(true, buttonProfile)
  api.changeUserInfo({name:popupName.value, about:popupAbout.value})
  .then(() =>{
    popupEdit.close();
    userInfo.setUserInfo({name:popupName.value, about:popupAbout.value});
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(()=>renderLoading(false, buttonProfile))
});

formElementAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, buttonProfileAvatar)
  api.changeAvatar({avatar:popupAvatar.value})
  .then(() =>{
    popupEditAvatar.close();
    userInfo.setAvatar(popupAvatar.value);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(()=>renderLoading(false, buttonProfileAvatar))
});

popupOpenButtonAddPicture.addEventListener('click', () =>  {
  formValidatorAddPicture.resetForm(); 
  formElementAddCard.reset();
  formValidatorAddPicture.enableValidation();
  addNewCard.open(); 
});

formValidatorEditProfile.enableValidation();
formValidatorEditProfileAvatar.enableValidation();
import '../pages/index.css';
import {validationOptions, buttonEdit, formEdit, nameInput, jobInput, buttonAddCard, formAddCard, popupEditProfile,
  popupAddCard, popupImage, userName, userAbout, userAvatar, popupDeleteCard, avatarEdit, popupEditAvatar, formEditAvatar} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';

///////////подключение валидации к формам////////////

const validationFormEdit = new FormValidator(validationOptions, formEdit);
validationFormEdit.enableValidation();
const validationFormAddCard = new FormValidator(validationOptions, formAddCard);
validationFormAddCard.enableValidation();
const validationFormEditAvatar = new FormValidator(validationOptions, formEditAvatar);
validationFormEditAvatar.enableValidation();

///////////иницциализация API////////////////

const api = new Api( {
  url: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: 'f3212500-9079-4baf-960a-ebb0a958194b',
    'Content-Type': 'application/json'
  }
})

/////////изначальная загрузка информации о пользователе и карточек//////////////

let myId;
Promise.all([
  api.getUserInfoFromServer(), //отправляем запросы на юзер инфо и карточки
  api.getInitialCardsFromServer()
])
.then(([userInfo, cardInfo]) => { //разбираем ответы
  userName.textContent = userInfo.name;
  userAbout.textContent = userInfo.about;
  userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
  myId = userInfo._id;
  defaultCardList.renderItems(cardInfo); //отрисовка дефолтных карточек
})
.catch((err) => {
  console.log(`Ошибка: ${err}`)
});

////////генерация карточки/////////////

const createCard = (data) => { //создание и возврат шаблона карточки
  const cardElement = new Card (data, '#card-template', handleCardClick, handleDeleteClick, handleLikeClick, handleDeleteLikeClick, myId);
  function handleDeleteClick() {
    deletePopup.open(data, cardElement);
    deletePopup.confirmDelete = () => {
      return api.deleteMyCard(data._id)
        .then (res => {
          cardElement.handleDelete();
          deletePopup.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    }
  }

  function handleLikeClick() {
    api.putLikeOnCard(data._id)
    .then (res=> {
      cardElement.handleLike(res); 
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }

  function handleDeleteLikeClick() {
      api.removeLikeFromCard(data._id)
        .then (res=> {
        cardElement.handleLikeRemove(res); 
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
  }

  return cardElement.renderCard(); 
}

/////////отрисовка стартовых карточек на странице////////////////

const defaultCardList = new Section ({ //создание дефолтных карточек
  renderer: (data) => {
    const card = createCard(data);
    defaultCardList.addItems(card);
  },
}, '.elements'
); 

////////////////попап подтверждения удаления карточки////////////////////

const deletePopup = new PopupConfirmDelete({ //попап удаления карточки
  popupElement: popupDeleteCard
})
deletePopup.setEventListeners();


/////////редактирование текстовой информации в профиле/////////////

const userInformation = new UserInfo({ //экземпляр класса информация о пользователе
  userNameSelector: '.profile__name', 
  userInfoSelector: '.profile__about',
  userAvatarSelector: '.profile__image' 
});

const editProfileInfo = new PopupWithForm({ 
  popupElement: popupEditProfile, //селектор попапа
  handleFormSubmit: (data) => { //сабмит формы профиля принимает объект, который делаеет гетинпутвэлъю
    editProfileInfo.renderLoading(true, 'Сохранение...');  
    api.setUserInfoOnServer(data)
  .then (res => {
    userInformation.setUserInfo(data);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    editProfileInfo.renderLoading(false, 'Сохранить');  
  });   
    editProfileInfo.close();
  }
});

editProfileInfo.setEventListeners();
buttonEdit.addEventListener('click', () => {  //открытие попапа редактирования профиля
  const userInfo = userInformation.getUserInfo();
  nameInput.value = userInfo.name; 
  jobInput.value = userInfo.about; 
  validationFormEdit.enableButton(); //кнопка активна при открытии
  validationFormEdit.clearErrorMessage(); //очистка сообщений об ошибках
  editProfileInfo.open();
});

/////////попап редактирования аватара/////////////

const editAvatar = new PopupWithForm({ 
  popupElement: popupEditAvatar,
  handleFormSubmit: (data) => {  //сабмит формы профиля принимает объект, который делаеет гетинпутвэлъю
    editAvatar.renderLoading(true, 'Сохранение...');  
    api.editAvatarImage(data)
    .then (res => {
      console.log('аватар=>', data.avatar);
      userInformation.editAvatar(data); //здесь метод класса ЮзерИнфо
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      editAvatar.renderLoading(false, 'Сохранить');  
    });     
  }
});
editAvatar.setEventListeners();

avatarEdit.addEventListener('click', () => {
  validationFormEditAvatar.disableButton(); //кнопка не активна при открытии 
  validationFormEditAvatar.clearErrorMessage(); //очистка сообщений об ошибках
  editAvatar.open();
});

/////////попап добавления карточки/////////////

const addNewCard = new PopupWithForm({ //попап добавления карточки
  popupElement: popupAddCard, 
  handleFormSubmit: (data) => { //сабмит формы профиля принимает объект, который делаеет гетинпутвэлъю
    addNewCard.renderLoading(true, 'Сохранение...');  
    api.addNewCardOnServer(data)
    .then (res => {
      data._id = res._id;
      data.likes = res.likes;
      data.owner = res.owner;
     })
    .then (res => {
      defaultCardList.addNewItem(createCard(data));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      addNewCard.renderLoading(false, 'Создать');  
    });
  }
});
addNewCard.setEventListeners(); 
buttonAddCard.addEventListener('click', () => {
  validationFormAddCard.disableButton(); //кнопка не активна при открытии 
  validationFormAddCard.clearErrorMessage(); //очистка сообщений об ошибках
  addNewCard.open();
});

/////////попап зума изображения в карточке/////////////

const popupOpenImage = new PopupWithImage(popupImage);
popupOpenImage.setEventListeners();

const handleCardClick = (name, link) => { //открытие попапа картинки
  popupOpenImage.open(name, link);
}





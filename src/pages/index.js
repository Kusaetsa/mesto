import '../pages/index.css';
import {
  validationOptions, buttonEdit, formEdit, nameInput, jobInput, buttonAddCard, formAddCard, popupEditProfile,
  popupAddCard, popupImage, userName, userAbout, userAvatar, popupDeleteCard, avatarEdit, popupEditAvatar, formEditAvatar
} from '../utils/constants.js';
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

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: 'f3212500-9079-4baf-960a-ebb0a958194b',
    'Content-Type': 'application/json'
  }
})

/////////изначальная загрузка информации о пользователе и карточек//////////////

let userId;
Promise.all([
  api.getUserInfoFromServer(), //отправляем запросы на юзер инфо и карточки
  api.getInitialCardsFromServer()
])
  .then((res) => { //разбираем ответы
    userId = userInformation.setUserInfo(res[0]);
    defaultCardList.renderItems(res[1]); //отрисовка дефолтных карточек
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  });


////////генерация карточки/////////////

const createCard = (data) => { //создание и возврат шаблона карточки
  const cardElement = new Card(data, '#card-template', handleCardClick, handleDeleteClick, handleLikeClick, handleDeleteLikeClick, userId);
  function handleDeleteClick() {
    deletePopup.open(data, cardElement);
    deletePopup.confirmDelete = () => {
      return api.deleteMyCard(data._id)
        .then(res => {
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
      .then(res => {
        cardElement.handleLike(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleDeleteLikeClick() {
    api.removeLikeFromCard(data._id)
      .then(res => {
        cardElement.handleLikeRemove(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  return cardElement.renderCard();
}

/////////отрисовка стартовых карточек на странице////////////////

const defaultCardList = new Section({ //создание дефолтных карточек
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
  userAvatarSelector: '.profile__image',
});


const editProfileInfo = new PopupWithForm({
  popupElement: popupEditProfile, //селектор попапа
  handleFormSubmit: (data) => { //сабмит формы профиля принимает объект, который делаеет гетинпутвэлъю
    function makeRequest() { // функция возвращает промис
      return api.setUserInfoOnServer(data) // return позволяет продолжать цепочку `then, catch, finally`
        .then((res) => {
          userInformation.setUserInfo(res);
        });
    }
    editProfileInfo.handleSubmit(makeRequest, editProfileInfo); // вызов универсального метода
  }
});

editProfileInfo.setEventListeners();
buttonEdit.addEventListener('click', () => {  //открытие попапа редактирования профиля
  const userInfo = userInformation.getUserInfo();
  editProfileInfo.setInputValues(userInfo);
  validationFormEdit.enableButton(); //кнопка активна при открытии
  validationFormEdit.clearErrorMessage(); //очистка сообщений об ошибках
  editProfileInfo.open();
});

/////////попап редактирования аватара/////////////

const editAvatar = new PopupWithForm({
  popupElement: popupEditAvatar,
  handleFormSubmit: (data) => { //сабмит формы профиля принимает объект, который делаеет гетинпутвэлъю
    function makeRequest() { // функция возвращает промис
      return api.editAvatarImage(data) // return позволяет продолжать цепочку `then, catch, finally`
        .then((res) => {
          userInformation.editAvatar(res.avatar);
        });
    }
    editAvatar.handleSubmit(makeRequest, editAvatar); // вызов универсального метода
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
    function makeRequest() { // функция возвращает промис
      return api.addNewCardOnServer(data) // return позволяет продолжать цепочку `then, catch, finally`
        .then((res) => {
          data._id = res._id;
          data.likes = res.likes;
          data.owner = res.owner;
          defaultCardList.addNewItem(createCard(res));
        });
    }
    addNewCard.handleSubmit(makeRequest, addNewCard); // вызов универсального метода
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





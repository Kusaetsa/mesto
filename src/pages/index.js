import '../pages/index.css';
import {initialCards, validationOptions, buttonEdit, formEdit, nameInput, jobInput, buttonAddCard, formAddCard, popupEditProfile,
  popupAddCard, popupImage} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'

const validationFormEdit = new FormValidator(validationOptions, formEdit);
validationFormEdit.enableValidation();

const validationFormAddCard = new FormValidator(validationOptions, formAddCard);
validationFormAddCard.enableValidation();


const handleCardClick = (name, link) => { //открытие попапа картинки
  const popupOpenImage = new PopupWithImage(popupImage);
  popupOpenImage.setEventListeners();
  popupOpenImage.open(name, link);
}

const createCard = ({name, link}) => { //создание и возврат шаблона карточки
  const cardElement = new Card ({name, link}, '#card-template', handleCardClick).renderCard();
  return cardElement; 
}

const defaultCardList = new Section ({ //создание дефолтных карточек
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    defaultCardList.addItem(card);
  },
}, '.elements'
); 
defaultCardList.renderItems(); //отрисовка дефолтных карточек 

const userInformation = new UserInfo({ //экземпляр класса информация о пользователе
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__about'
});

const editProfileInfo = new PopupWithForm({ //попап редактирования профиля
  popupSelector: popupEditProfile,
  handleFormSubmit: ({ name, about }) => {
    userInformation.setUserInfo({ name, about });
    editProfileInfo.close();
  }
});
editProfileInfo.setEventListeners();

buttonEdit.addEventListener('click', () => {  //открытие попапа редактирования профиля
  const obj = userInformation.getUserInfo();
  nameInput.value = obj.name; //подтягиваем данные из инфы в профиле
  jobInput.value = obj.about; 
  validationFormEdit.enableButton(); //кнопка активна при открытии
  validationFormEdit.clearErrorMessage(); //очистка сообщений об ошибках
  editProfileInfo.open();
});

const addNewCard = new PopupWithForm({ //попап добавления карточки
  popupSelector: popupAddCard, 
  handleFormSubmit: (formData) => {
    const card = createCard(formData);
    defaultCardList.addItem(card);
  }
});
addNewCard.setEventListeners(); 
buttonAddCard.addEventListener('click', () => {
  validationFormAddCard.disableButton(); //кнопка не активна при открытии 
  validationFormAddCard.clearErrorMessage(); //очистка сообщений об ошибках
  addNewCard.open();
});

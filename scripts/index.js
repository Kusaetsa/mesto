import {initialCards, validationOptions, buttonEdit, profileName, profileInfo, formEdit, nameInput, jobInput, buttonAddCard, formAddCard, cardContainer, template, placeInput, linkInput, popupEditProfile,
  popupAddCard, popupImage, imageContainer, popupBg, imageCaption, buttonSubmitAddForm, buttonSubmitEditForm, buttonCloseList} from './constants.js';
import Card from './card.js';
import FormValidator from './formValidator.js';

const ValidationFormEdit = new FormValidator(validationOptions, formEdit);
ValidationFormEdit.enableValidation();

const ValidationFormAddCard = new FormValidator(validationOptions, formAddCard);
ValidationFormAddCard.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавить класс видимости попапа
  document.addEventListener('keydown', closeByEsc); //слушатель на событие клавиши esc
}

function closePopup(popup) {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', closeByEsc);
}

function changeProfileInfo(evt) { //изменение информации о пользователе
    evt.preventDefault();
    profileName.textContent = nameInput.value; //меняем имя пользователя
    profileInfo.textContent = jobInput.value; //меняем доп.инфу пользователя
    closePopup(popupEditProfile);   
}

const closeByEsc = (evt) => { 
  if (evt.key === "Escape") { // при нажатии esc
    const currentPopup = document.querySelector('.popup_opened'); //находим открытый попап
    closePopup(currentPopup); //закрываем его
  }
}

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) { //если событие сработало на открытом попапе
    closePopup(evt.target); //закрываем попап, где был клик
  }
}

const openImage = (name, link) => { 
  popupBg.src = link; //выводим актуальную картинку 
  imageCaption.textContent = name; //выводим актуальную подпись 
  popupBg.setAttribute('alt', name); //альт к картинке
  openPopup(popupImage); //открываем попап с картинкой 
} 

const createCard = ({name, link}) => {
  const cardElement = new Card ({name, link}, '#card-template', openImage).renderCard();
  return cardElement; 
}

initialCards.forEach(({name, link}) => {
  const cardElement = createCard({name, link}); 
  cardContainer.prepend(cardElement); //отрисовка дефолтных карточек
});

function addCard(evt) { //добавление новой карточки
    evt.preventDefault();
    const cardElement = createCard({name: placeInput.value, link: linkInput.value}); 
    cardContainer.prepend(cardElement); 
    formAddCard.reset(); //очищаем форму
    closePopup(popupAddCard);  //закрываем попап
}

const handleOpenPopupProfile = () => {
  nameInput.value = profileName.textContent; //подтягиваем данные из инфы в профиле
  jobInput.value = profileInfo.textContent;
}

buttonEdit.addEventListener('click', () => {  //открытие попапа редактирования профиля
  handleOpenPopupProfile();
  ValidationFormEdit.enableButton(); //кнопка активна при открытии
  ValidationFormEdit.clearErrorMessage(); //очистка сообщений об ошибках
  openPopup(popupEditProfile);
});

formEdit.addEventListener('submit', changeProfileInfo); //отправка формы редактирования профиля

buttonAddCard.addEventListener('click', () => { //открытие попапа добавления карточки
    formAddCard.reset(); //очищаем форму добавления карточки
    ValidationFormAddCard.disableButton(); //кнопка не активна при открытии 
    ValidationFormAddCard.clearErrorMessage(); //очистка сообщений об ошибках
    openPopup(popupAddCard); 
 }); 
 
formAddCard.addEventListener('submit', addCard); //отправка формы добавления карточки

buttonCloseList.forEach ((buttonClose) => { 
const currentPopup = buttonClose.closest('.popup'); 
currentPopup.addEventListener('mousedown', closeByOverlay); //слушатель для всех попапов на закрытие по оверлею
buttonClose.addEventListener('click', () =>  //слушатели для всех иконок-крестиков на закрытие по клику 
closePopup(currentPopup));
});




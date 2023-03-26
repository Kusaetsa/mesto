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

const openImage = (evt) => { 
  const thisItem = evt.target.closest('.element'); //определяем родителя кликнутого элемента 
  const thisImage = thisItem.querySelector('.element__image'); //находим изображение 
  const thisCaption = thisItem.querySelector('.element__title'); //находим название места 
  popupBg.src = thisImage.src; //выводим актуальную картинку 
  imageCaption.textContent = thisCaption.textContent; //выводим актуальную подпись 
  openPopup(popupImage); //открываем попап с картинкой 
} 

initialCards.forEach(({name, link}) => { 
  const card = new Card ({name, link}, '#card-template', openImage); //создаем экземпляры класса для дефолтных карточек
  const cardElement = card.renderCards(); //отрисовываем карточки
  cardContainer.prepend(cardElement);
});

function addCard(evt) {
    evt.preventDefault();
    const card = new Card ({name: placeInput.value, link: linkInput.value}, '#card-template', openImage); //создаем экземпляр класса для новой карточки
    const cardElement = card.renderCards(); //отрисовываем новую карточку
    cardContainer.prepend(cardElement);
    formAddCard.reset(); //очищаем форму
    closePopup(popupAddCard);  //закрываем попап
}

const handleOpenPopupProfile = () => {
  nameInput.value = profileName.textContent; //подтягиваем данные из инфы в профиле
  jobInput.value = profileInfo.textContent;
}

const clearAllErrors = (form) => { //очистка сообщений об ошибках для открытия форм;
  const inputs = Array.from(form.querySelectorAll('.popup__item')); 
  inputs.forEach((inputElement) => { //снимаем классы ошибок во всех инпутах формы
    inputElement.classList.remove('popup__item-error_active');
    inputElement.classList.remove('popup__item_type_error');
  });
  const errorMessages = Array.from(form.querySelectorAll('.popup__item-error'));
  errorMessages.forEach((errorElemtnt) => { //очищаем все спаны с ошибками в форме
    errorElemtnt.textContent = '';
  });
}

buttonEdit.addEventListener('click', () => {  //открытие попапа редактирования профиля
  handleOpenPopupProfile();
  buttonSubmitEditForm.classList.remove('popup__button_inactive');
  buttonSubmitEditForm.removeAttribute('disabled');//делаем кнопку активной по дефолту, т.к. сохранить с невалидными данными эту форму нельзя
  clearAllErrors(formEdit); //удаляем возможные сообщения об ошибках
  openPopup(popupEditProfile);
});

formEdit.addEventListener('submit', changeProfileInfo); //отправка формы редактирования профиля

buttonAddCard.addEventListener('click', () => { //открытие попапа добавления карточки
    formAddCard.reset(); //очищаем форму добавления карточки
    buttonSubmitAddForm.classList.add('popup__button_inactive');
    buttonSubmitAddForm.setAttribute('disabled', true);//кнопка не активна по-дефолту
    clearAllErrors(formAddCard); //удаляем возможные сообщения об ошибках
    openPopup(popupAddCard); 
 }); 
 
formAddCard.addEventListener('submit', addCard); //отправка формы добавления карточки

buttonCloseList.forEach ((buttonClose) => { 
const currentPopup = buttonClose.closest('.popup'); 
currentPopup.addEventListener('mousedown', closeByOverlay); //слушатель для всех попапов на закрытие по оверлею
buttonClose.addEventListener('click', () =>  //слушатели для всех иконок-крестиков на закрытие по клику 
closePopup(currentPopup));
});




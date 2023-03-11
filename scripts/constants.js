const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const validationOptions = {
  formSelector: '.popup',
  buttonSelector: '.popup__button',
  inputSelector: '.popup__item', 
  inputSectionSelector: '.popup__form-section',
  inputErrorSelector: '.popup__item-error',
  disabledButtonClass: 'popup__button_inactive',
  errorMessageClass: 'popup__item-error_active',
  errorFieldClass: 'popup__item_type_error',
};

const editButton = document.querySelector('.profile__edit-button'); //кнопка редактирования
const profileName = document.querySelector('.profile__name'); //имя пользователя
const profileInfo = document.querySelector('.profile__about'); //доп.инфа о пользователе
const editForm = document.querySelector('[name="edit-popup-form"]'); //форма редактирования профиля
const nameInput = document.querySelector('.popup__item_el_name'); //инпут имени
const jobInput = document.querySelector('.popup__item_el_about'); //инпут доп.инфы
const addButton = document.querySelector('.profile__add-button'); //кнопка добавления карточки
const addForm = document.querySelector('[name="add-popup-form"]'); //форма для карточек
const cardContainer = document.querySelector('.elements'); //контейнер куда вставляем
const template = document.getElementById('card-template').content; //шаблон
const placeInput = document.querySelector('.popup__item_el_place'); //инпут названия места
const linkInput = document.querySelector('.popup__item_el_link'); //инпут ссылки на картинку
const popupEditProfile = document.querySelector('.popup_edit-form'); // попап редактирование профиля
const popupAddCard = document.querySelector('.popup_add-card'); // попап добавления карточки
const popupImage = document.querySelector('.popup_image'); //попап с картинкой
const imageContainer = popupImage.querySelector('.popup__container'); //получаем контейнер изображения
const popupBg = popupImage.querySelector('.popup__image'); //получаем изображение
const imageCaption = popupImage.querySelector('.popup__caption'); //получаем подпись к изображению
const closeEditPopup = popupEditProfile.querySelector('.popup__close-icon'); //закрыть попап редактирования профиля
const closeAddPopup = popupAddCard.querySelector('.popup__close-icon'); //закрыть попап добавления карточки
const closeImagePopup = popupImage.querySelector('.popup__close-icon'); //закрыть попап с картинкой
const addCardButton = document.querySelector('[name="add-popup-button"]'); //кнопка "создать" - добавление новой карточки
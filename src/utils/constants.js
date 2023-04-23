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

  const buttonEdit = document.querySelector('.profile__edit-button'); //кнопка редактирования
  const formEdit = document.querySelector('[name="edit-popup-form"]'); //форма редактирования профиля
  const nameInput = document.querySelector('.popup__item_el_name'); //инпут имени
  const jobInput = document.querySelector('.popup__item_el_about'); //инпут доп.инфы
  const buttonAddCard = document.querySelector('.profile__add-button'); //кнопка добавления карточки
  const formAddCard = document.querySelector('[name="add-popup-form"]'); //форма для карточек
  const popupEditProfile = document.querySelector('.popup_edit-form'); // попап редактирование профиля
  const popupAddCard = document.querySelector('.popup_add-card'); // попап добавления карточки
  const popupImage = document.querySelector('.popup_image'); //попап с картинкой


export {initialCards, validationOptions, buttonEdit, formEdit, nameInput, jobInput, buttonAddCard, formAddCard, popupEditProfile,
  popupAddCard, popupImage}

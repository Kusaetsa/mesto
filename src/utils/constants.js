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
  const userName = document.querySelector('.profile__name'); //имя профиля
  const userAbout = document.querySelector('.profile__about'); //информация о пользователе
  const userAvatar = document.querySelector('.profile__image'); //аватар пользователя
  const popupDeleteCard = document.querySelector('.popup_delete-card'); //попап удаления карточки
  const avatarEdit = document.querySelector('.profile__edit-avatar'); //див редактирования аватара
  const popupEditAvatar = document.querySelector('.popup_edit-avatar'); //попап редактирования аватара
  const formEditAvatar = document.querySelector('[name="edit-avatar-form"]'); //форма загрузки ссылки на аватар


export {validationOptions, buttonEdit, formEdit, nameInput, jobInput, buttonAddCard, formAddCard, popupEditProfile,
  popupAddCard, popupImage, userName, userAbout, userAvatar, popupDeleteCard, avatarEdit, popupEditAvatar, formEditAvatar}

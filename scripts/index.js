
function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавить класс видимости попапа
  document.addEventListener('keydown', closeByEsc); //слушатель на событие клавиши esc
  popup.addEventListener('click', closeByOverlay); //слушатель на клик по оверлею
  const inputs = Array.from(document.querySelectorAll('.popup__item')); 
  inputs.forEach(inputElement => {
    hiddenErrorMessage(inputElement, validationOptions) //скрываем сообщения об ошибках на инпутах
      });
  addForm.reset(); //очищаем форму добавления карточки
  disableButton(addCardButton, validationOptions.disabledButtonClass);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('mousedown', closeByOverlay);
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

const handleDelete = (evt) => {
    evt.target.closest('.element').remove(); //удаляем карточку с кликнутой урной
}

const handleLike = (evt) => {
    const thisLike = evt.target.closest('.element__like'); //выбираем кликнутый лайк
    thisLike.classList.toggle('element__like_active'); //переключатель класса нажатого сердечка
}

const openImage = ({name, link}) => {
    popupBg.src = link; //выводим актуальную картинку
    imageCaption.textContent = name; //выводим актуальную подпись
    popupImage.style.backgroundColor = 'rgba(0, 0, 0, .9)'; //затемняем фон
    imageContainer.classList.add('popup__container_for-image'); //подключаем класс модификации оболочки попапа
    openPopup(popupImage); //открываем попап с картинкой
}

function createCards({name, link}) { //создание карточки 
    const newCard = template.querySelector('.element').cloneNode(true); //клонировали обертку из шаблона
    const newCardImage = newCard.querySelector('.element__image'); //слой с картинкой в бэкграунде
    const newCardTitle = newCard.querySelector('.element__title'); //название места
    const deleteButton = newCard.querySelector('.element__delete-button'); //удалить
    const likeButton = newCard.querySelector('.element__like'); //лайк
    newCardImage.src = link; //меняем src на значение link
    newCardTitle.textContent = name; //меняем название места на значение name
    newCardImage.setAttribute('alt', name); //переписываем alt у картинки на значение name
    deleteButton.addEventListener('click', handleDelete); //событие удалить
    likeButton.addEventListener('click', handleLike); //событие лайк
    newCardImage.addEventListener('click', () => {
    openImage({name, link})
    }); //открыть картинку
    return newCard; //возврат карточки
}

function renderCards({name, link}) { //добавление карточки на страницу
    cardContainer.prepend(createCards({name, link})); 
}

initialCards.forEach((name, link) => { //создание и добавление карточек из массива
  renderCards(name, link);
})

function addCard(evt) {
    evt.preventDefault();
    renderCards({name: placeInput.value, link: linkInput.value});
    addForm.reset(); //очистить форму
    closePopup(popupAddCard); 
}

const handleOpenPopupProfile = () => {
  nameInput.value = profileName.textContent; //подтягиваем данные из инфы в профиле
  jobInput.value = profileInfo.textContent;  
}

editButton.addEventListener('click', () => {  //открытие попапа редактирования профиля
  handleOpenPopupProfile();
  openPopup(popupEditProfile);
});

editForm.addEventListener('submit', changeProfileInfo); //отправка формы редактирования профиля

closeEditPopup.addEventListener('click', () => { 
  closePopup(popupEditProfile) //закрытие попапа редактирования профиля
}); 

addButton.addEventListener('click', () => {
    openPopup(popupAddCard); //открытие попапа добавления карточки
 }); 

 closeAddPopup.addEventListener('click', () => {
  closePopup(popupAddCard); //закрытие попапа добавления карточки
  addForm.reset();
}); 
 
addForm.addEventListener('submit', addCard); //отправка формы добавления карточки

closeImagePopup.addEventListener('click', () => {
  closePopup(popupImage); //закрытие попапа с картинкой
}); 



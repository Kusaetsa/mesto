
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
    formAddCard.reset(); //очистить форму
    closePopup(popupAddCard); 
}

const handleOpenPopupProfile = () => {
  nameInput.value = profileName.textContent; //подтягиваем данные из инфы в профиле
  jobInput.value = profileInfo.textContent;
}

buttonEdit.addEventListener('click', () => {  //открытие попапа редактирования профиля
  handleOpenPopupProfile();
  enableButton(buttonSubmitEditForm, validationOptions.disabledButtonClass); //делаем кнопку активной по дефолту, т.к. сохранить с невалидными данными эту форму нельзя
  clearErrorMessage(); //удаляем возможные сообщения об ошибках
  openPopup(popupEditProfile);
});

formEdit.addEventListener('submit', changeProfileInfo); //отправка формы редактирования профиля

buttonAddCard.addEventListener('click', () => { //открытие попапа добавления карточки
    formAddCard.reset(); //очищаем форму добавления карточки
    disableButton(buttonSubmitAddForm, validationOptions.disabledButtonClass); //кнопка не активна по-дефолту
    clearErrorMessage(); //удаляем возможные сообщения об ошибках
    openPopup(popupAddCard); 
 }); 
 
formAddCard.addEventListener('submit', addCard); //отправка формы добавления карточки

buttonCloseList.forEach ((buttonClose) => { 
const currentPopup = buttonClose.closest('.popup'); 
currentPopup.addEventListener('mousedown', closeByOverlay); //слушатель для всех попапов на закрытие по оверлею
buttonClose.addEventListener('click', () =>  //слушатели для всех иконок-крестиков на закрытие по клику 
closePopup(currentPopup));
});
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

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function changeProfileInfo(evt) { //изменение информации о пользователе
    evt.preventDefault();
    profileName.textContent = nameInput.value; //меняем имя пользователя
    profileInfo.textContent = jobInput.value; //меняем доп.инфу пользователя
    closePopup(popupEditProfile);   
}

const handleDelete = (evt) => {
    evt.target.closest('.element').remove(); //удаляем карточку с кликнутой урной
}

const handleLike = (evt) => {
    const thisLike = evt.target.closest('.element__like'); //выбираем кликнутый лайк
    thisLike.classList.toggle('element__like_active'); //переключатель класса нажатого сердечка
}

const openImage = (evt) => {
    const thisItem = evt.target.closest('.element'); //определяем родителя кликнутого элемента
    const thisImage = thisItem.querySelector('.element__image'); //находим изображение
    const thisCaption = thisItem.querySelector('.element__title'); //находим название места
    popupBg.src = thisImage.src; //выводим актуальную картинку
    imageCaption.textContent = thisCaption.textContent; //выводим актуальную подпись
    popupImage.style.backgroundColor = 'rgba(0, 0, 0, .9)'; //затемняем фон
    imageContainer.classList.add('popup__container_for-image');
    openPopup(popupImage); //открываем попап с картинкой
}

function createCards({name, link}) { //создание карточки с именем и ссылкой из массива/инпутов формы
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
    newCardImage.addEventListener('click', openImage); //открыть картинку
    return newCard; //возврат карточки
}

initialCards.forEach((item) => {
    cardContainer.prepend(createCards(item)); //отрисовываем карточки из массива
})

function addCard(evt) {
    evt.preventDefault();
    // генерируем новую карточку
    const newCard = createCards({name: placeInput.value, link: linkInput.value}); //подключаем инпуты к функции создания карточки
    cardContainer.prepend(newCard); //добавить карточку в начало страницы
    addForm.reset(); //очистить форму
    closePopup(popupAddCard); 
}

editButton.addEventListener('click', () => {  //открытие попапа редактирования профиля
    openPopup(popupEditProfile);
    nameInput.textContent = profileName.value; //подтягиваем данные 
    jobInput.textContent = profileInfo.value;
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
}); 
 
addForm.addEventListener('submit', addCard); //отправка формы добавления карточки

closeImagePopup.addEventListener('click', () => {
  closePopup(popupImage); //закрытие попапа с картинкой
}); 
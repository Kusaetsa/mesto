const editButton = document.querySelector('.profile__edit-button'); //кнопка редактирования
const popups = document.querySelectorAll('.popup'); //псевдомассив попапов
const popupCloseIcon = document.querySelectorAll('.popup__close-icon'); //псевдомассив иконок закрытия
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


function openPopup(i) {
    popups[i].classList.add('popup_opened'); //из коллекции элементов с классом popup выбираем нужный по индексу и добавляем ему класс открытия
}

function closePopup() { //закрытие попапов
    const popupArray = Array.from(popups); //создаем массив из хтмл-коллекции попапов
    const currentPopup = popupArray.find((item) => {
        return item.classList.contains('popup_opened'); //ищем открытый попап по классу
    });
    currentPopup.classList.remove('popup_opened'); //убираем класс на открытом попапе
}

function changeProfileInfo(evt) { //изменение информации о пользователе
    evt.preventDefault();
    profileName.textContent = nameInput.value; //меняем имя пользователя
    profileInfo.textContent = jobInput.value; //меняем доп.инфу пользователя
    closePopup();   
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
    const popupImage = document.querySelector('.popup_image'); //получаем попап с картинкой
    const imageContainer = popupImage.querySelector('.popup__container'); //получаем контейнер изображения
    const popupBg = popupImage.querySelector('.popup__image'); //получаем изображение
    const imageCaption = popupImage.querySelector('.popup__caption'); //получаем подпись к изображению
    popupBg.src = thisImage.src; //выводим актуальную картинку
    imageCaption.textContent = thisCaption.textContent; //выводим актуальную подпись
    popupImage.style.backgroundColor = 'rgba(0, 0, 0, .9)'; //затемняем фон
    imageContainer.style.borderRadius = '0px';  //стиль контейнера
    imageContainer.style.padding = '0'; //стиль контейнера
    imageContainer.style.backgroundColor = 'transparent'; //стиль контейнера
    imageContainer.style.maxWidth = '75vw'; //стиль контейнера
    imageContainer.style.justifyContent = 'flex-start'; //стиль контейнера
    openPopup(2); //открываем попап с картинкой
}

function renderCards(item) {
    const newCard = template.cloneNode(true); //клонированный шаблон
    const newCardImage = newCard.querySelector('.element__image'); //слой с картинкой в бэкграунде
    const newCardTitle = newCard.querySelector('.element__title'); //название места
    const deleteButton = newCard.querySelector('.element__delete-button'); //удалить
    const likeButton = newCard.querySelector('.element__like'); //лайк
    newCardImage.src = item.link; //меняем src
    newCardTitle.textContent = item.name; //меняем название места
    newCardImage.setAttribute('alt', item.name); //переписываем alt у картинки
    deleteButton.addEventListener('click', handleDelete); //событие удалить
    likeButton.addEventListener('click', handleLike); //событие лайк
    newCardImage.addEventListener('click', openImage); //открыть картинку
    return newCard; //возврат карточки
}

initialCards.forEach((item) => {
    cardContainer.prepend(renderCards(item)); //отрисовываем карточки из массива
})

function addCard(evt) {
    evt.preventDefault();
    const newCard = template.cloneNode(true); //клонированный шаблон
    const newCardImage = newCard.querySelector('.element__image'); //слой с картинкой в бэкграунде
    const newCardTitle = newCard.querySelector('.element__title'); //название места
    const deleteButton = newCard.querySelector('.element__delete-button'); //удалить
    const likeButton = newCard.querySelector('.element__like'); //лайк
    newCardImage.src = linkInput.value;
    newCardTitle.textContent = placeInput.value;
    newCardImage.setAttribute('alt', placeInput.value); //переписываем alt у картинки
    deleteButton.addEventListener('click', handleDelete); //событие удалить
    likeButton.addEventListener('click', handleLike); //событие лайк
    newCardImage.addEventListener('click', openImage); //открыть картинку
    cardContainer.prepend(newCard); //добавить карточку в начало страницы
    linkInput.value = ''; //очистить инпут ссылки
    placeInput.value = ''; //очистить инпут места
    closePopup();
}

editButton.addEventListener('click', () => {  //событие по кнопке редактирования профиля
    openPopup(0);
    nameInput.textContent = profileName.value; //подтягиваем данные 
    jobInput.textContent = profileInfo.value;
});
editForm.addEventListener('submit', changeProfileInfo); //отправка формы редактирования профиля
popupCloseIcon[0].addEventListener('click', closePopup); //закрытие попапа редактирования профиля
popupCloseIcon[1].addEventListener('click', closePopup); //закрытие попапа добавления карточки
popupCloseIcon[2].addEventListener('click', closePopup); //закрытие попапа с картинкой
addButton.addEventListener('click', () => {
    openPopup(1);
 });
addForm.addEventListener('submit', addCard);


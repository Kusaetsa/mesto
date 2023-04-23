import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor ({ popupSelector, handleFormSubmit} ) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__item'));
    }

    _getInputValues() { //получаем значения полей формы в объект
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues()); //тут объект
            this.close();
        });
    }


}

export default PopupWithForm;

/*
function changeProfileInfo(evt) { //изменение информации о пользователе
    evt.preventDefault();
    profileName.textContent = nameInput.value; //меняем имя пользователя
    profileInfo.textContent = jobInput.value; //меняем доп.инфу пользователя
    closePopup(popupEditProfile);   
}
formEdit.addEventListener('submit', changeProfileInfo); //отправка формы редактирования профиля

function addCard(evt) { //добавление новой карточки
    evt.preventDefault();
    const cardElement = createCard({name: placeInput.value, link: linkInput.value}); 
    cardContainer.prepend(cardElement); 
    formAddCard.reset(); //очищаем форму
    closePopup(popupAddCard);  //закрываем попап
}
formAddCard.addEventListener('submit', addCard); //отправка формы добавления карточки

const handleOpenPopupProfile = () => {
  nameInput.value = profileName.textContent; //подтягиваем данные из инфы в профиле
  jobInput.value = profileInfo.textContent;
}

buttonEdit.addEventListener('click', () => {  //открытие попапа редактирования профиля
  handleOpenPopupProfile();
  validationFormEdit.enableButton(); //кнопка активна при открытии
  validationFormEdit.clearErrorMessage(); //очистка сообщений об ошибках
  const popup = new Popup(popupEditProfile);
  popup.open();
});

buttonAddCard.addEventListener('click', () => { //открытие попапа добавления карточки
    formAddCard.reset(); //очищаем форму добавления карточки
    validationFormAddCard.disableButton(); //кнопка не активна при открытии 
    validationFormAddCard.clearErrorMessage(); //очистка сообщений об ошибках
    const popup = new Popup(popupAddCard);
    popup.open();
 }); 


*/


/*
Создайте класс PopupWithForm
Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm 
должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({ popupElement, handleFormSubmit }) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__item'));
        this._submitButton = this._popupElement.querySelector('.popup__button');
        this._initialButtonText = this._submitButton.textContent;
    }

    _getInputValues() { //получаем значения полей формы в объект
        this._inputValues = {}; //создает пустой объект
        this._inputList.forEach((input) => { //обходит все инпуты и 
            this._inputValues[input.name] = input.value; //записывет данные с инпутов
        });
        return this._inputValues; //возвращает объект с данными которые ввели в форму
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading, buttonText) {
        if (isLoading) {
            this._submitButton.textContent = buttonText;
        } else {
            this._submitButton.textContent = this._initialButtonText;
        }
    }

    handleSubmit(request, popupInstance, buttonText = "Сохранение...") {
        popupInstance.renderLoading(true, buttonText);
        request()
          .then(() => {
            popupInstance.close()
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {
            popupInstance.renderLoading(false);
          });
      }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues()); //тут объект
        });
    }


}

export default PopupWithForm;


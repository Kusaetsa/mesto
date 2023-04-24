import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor ({ popupElement, handleFormSubmit} ) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__item'));
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


import Popup from "./Popup.js";

class PopupConfirmDelete extends Popup {
    constructor({ popupElement }) {
        super(popupElement);
        this._buttonDelete = this._popupElement.querySelector('.popup__button');
    }

    open(cardId, cardElement) {
        super.open();
        this.cardId = cardId;
        this.cardElement = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonDelete.addEventListener('click', () => {
            this.confirmDelete();
        });
    }
}

export default PopupConfirmDelete;
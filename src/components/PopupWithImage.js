import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._image = this._popupElement.querySelector('.popup__image');
        this._caption = this._popupElement.querySelector('.popup__caption');
    }

    open(name, link) {
        super.open();
        this._image.src = link;
        this._caption.textContent = name;
        this._image.setAttribute('alt', name);
    }

}

export default PopupWithImage;


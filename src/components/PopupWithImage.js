import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup__image');
        this._caption = this._popupSelector.querySelector('.popup__caption');
    }

    open(name, link) {
        super.open();
        this._image.src = link;
        this._caption.textContent = name;
        this._caption.setAttribute('alt', name);
    }

}

export default PopupWithImage;

/*
const openImage = (name, link) => { 
  popupBg.src = link; //выводим актуальную картинку 
  imageCaption.textContent = name; //выводим актуальную подпись 
  popupBg.setAttribute('alt', name); //альт к картинке
  openPopup(popupImage); //открываем попап с картинкой 
} 
*/

/*
Создайте класс PopupWithImage
Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.

*/
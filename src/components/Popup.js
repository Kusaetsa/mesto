class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
        this._buttonClose = this._popupSelector.querySelector('.popup__close-icon');
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened'); 
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") { 
            this.close(); 
          }
    }

    setEventListeners() {
      this._buttonClose.addEventListener('click', () => this.close());
      document.addEventListener('keydown', this._handleEscClose.bind(this)); 
      document.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) { 
      this.close(); 
      }
    })
    }

}

export default Popup;


/*
function openPopup(popup) {
    popup.classList.add('popup_opened'); //добавить класс видимости попапа
    document.addEventListener('keydown', closeByEsc); //слушатель на событие клавиши esc
  }
  
  function closePopup(popup) {
    popup.classList.remove('popup_opened'); 
    document.removeEventListener('keydown', closeByEsc);
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

  buttonCloseList.forEach ((buttonClose) => { 
const currentPopup = buttonClose.closest('.popup'); 
currentPopup.addEventListener('mousedown', closeByOverlay); //слушатель для всех попапов на закрытие по оверлею
buttonClose.addEventListener('click', () =>  //слушатели для всех иконок-крестиков на закрытие по клику 
closePopup(currentPopup));
});
*/
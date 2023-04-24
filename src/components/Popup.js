class Popup {
    constructor (popupElement) {
        this._popupElement = popupElement;
        this._buttonClose = this._popupElement.querySelector('.popup__close-icon');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose); 
    }

    close() {
        this._popupElement.classList.remove('popup_opened'); 
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") { 
            this.close(); 
          }
    }

    setEventListeners() {
      this._buttonClose.addEventListener('click', () => this.close());
      document.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) { 
      this.close(); 
      }
    })
    }

}

export default Popup;


class Card {
    constructor ({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    }
    
    _setEventListeners = () => {
      this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._name, this._link));
      this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
      this._element.querySelector('.element__like').addEventListener('click', this._handleLike);
    }
    

    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
    }

    renderCard() {
      this._element = this._getTemplate();
      this._image = this._element.querySelector('.element__image');
      this._image.src = this._link;
      this._element.querySelector('.element__title').textContent = this._name;
      this._image.setAttribute('alt', this._name);
      this._setEventListeners();

      return this._element;
    }


    _handleDelete = () => {
      this._element.remove();
      this._element = null;
    };
    
    _handleLike = () => {
      this._element.querySelector('.element__like').classList.toggle('element__like_active')
    };

}


export default Card;


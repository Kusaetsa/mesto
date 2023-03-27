class Card {
    constructor ({name, link}, templateSelector, openImage) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
    }
    
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
    }

    renderCard = () => {
      this._element = this._getTemplate();
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__title').textContent = this._name;
      this._element.querySelector('.element__image').setAttribute('alt', this._name);
      this._element.querySelector('.element__image').addEventListener('click', () => this._openImage(this._name, this._link));
      this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
      this._element.querySelector('.element__like').addEventListener('click', this._handleLike);

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
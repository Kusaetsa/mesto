class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, handleDeleteLikeClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; //уникальный айдишник карточки начинается с 644...
    this._likes = data.likes; //тут массив объектов
    this._ownerID = data.owner._id; //тут айди пользователя
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._image = this._element.querySelector('.element__image')
  }

  _setEventListeners = () => {
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
    this._likeButton.addEventListener('click', () => this.isLiked(this));
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  renderCard() {
    this._image.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._image.setAttribute('alt', this._name);
    this._likeCounter.textContent = this._likes.length;
    this.itsNotMyCard();
    this._setEventListeners();
    this.itsLikeByMe();
    return this._element;
  }

  handleDelete() {
    this._element.remove();
    this._element = null;
  };

  handleLike(data) {
    this._likeButton.classList.add('element__like_active');
    this._likeCounter.textContent = data.likes.length;
    this._likes = data.likes;
  };

  handleLikeRemove(data) {
    this._likeButton.classList.remove('element__like_active');
    this._likeCounter.textContent = data.likes.length;
    this._likes = data.likes;
  }

  itsNotMyCard() {
    if (this._ownerID !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
  }

  itsLikeByMe() {
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        this._likeButton.classList.add('element__like_active');
      }
    });
  }

  isLiked() {
    if (this._likes.some((item) => {
      return item._id === this._userId;
    })) {
      this._handleDeleteLikeClick();
    } else {
      this._handleLikeClick();
    }
  };



}


export default Card;


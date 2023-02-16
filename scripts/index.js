let editButton = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let popupCloseIcon = document.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__about');
let form = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__item_el_name');
let jobInput = document.querySelector('.popup__item_el_about');


function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function changeProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
form.addEventListener('submit', changeProfileInfo);
popupCloseIcon.addEventListener('click', closePopup);
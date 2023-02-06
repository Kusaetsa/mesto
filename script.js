let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseIcon = document.querySelector('.popup__close-icon');

editButton.addEventListener('click', function() {
    popup.classList.toggle('popup_opened');
});

function closePopup() {
    popup.classList.remove('popup_opened');
}

popupCloseIcon.addEventListener('click', closePopup);

let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__about');
let form = document.querySelector('.popup__container');

function changeProfileInfo() {
    let inputs = document.querySelectorAll('.popup__item');
    
    if (inputs[0].value.length < 3) {
        alert('Имя должно содержать больше двух символов');
    }
    else {
    profileName.textContent = inputs[0].value;
    profileInfo.textContent = inputs[1].value;
    closePopup();
    }
}

form.addEventListener('submit', changeProfileInfo);
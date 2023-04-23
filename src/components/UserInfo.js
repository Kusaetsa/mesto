class UserInfo {
    constructor( {userNameSelector, userInfoSelector} ) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userInfo.textContent
        }
    }


    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userInfo.textContent = about;
    }
}

export default UserInfo;



/*
Создайте класс UserInfo
Класс UserInfo отвечает за управление отображением информации 
о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: 
элемента имени пользователя и элемента информации о себе.

Содержит публичный метод getUserInfo, который возвращает объект 
с данными пользователя. Этот метод пригодится когда данные пользователя 
нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя 
и добавляет их на страницу.
*/
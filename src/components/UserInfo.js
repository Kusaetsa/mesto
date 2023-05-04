class UserInfo {
    constructor( {userNameSelector, userInfoSelector, userAvatarSelector} ) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() { //данные для открытия попапа
        return {
            name: this._userName.textContent,
            about: this._userInfo.textContent
        }
    }

    setUserInfo(data) { 
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
    }

    editAvatar(data) { 
        this._userAvatar.style.backgroundImage = `url(${data.avatar})`;
    }
}

export default UserInfo;



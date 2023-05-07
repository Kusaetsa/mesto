class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
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

    editAvatar(avatar) {
        this._userAvatar.style.backgroundImage = `url(${avatar})`;
    }


    setUserInfo( {name, about, avatar, _id} ) {
        this._userName.textContent = name;
        this._userInfo.textContent = about;
        this.editAvatar(avatar);
        this._userId = _id;
        return this._userId;
    }


}

export default UserInfo;



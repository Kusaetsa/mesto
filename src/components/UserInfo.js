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



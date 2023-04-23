class FormValidator {
    constructor(options, formElement) {
    this._inputSelector = options.inputSelector; // popup__item
    this._inputErrorSelector = options.inputErrorSelector; // popup__item-error
    this._buttonSelector = options.buttonSelector; // popup__button
    this._disabledButtonClass = options.disabledButtonClass; // popup__button_inactive
    this._errorMessageClass = options.errorMessageClass; // popup__item-error_active
    this._errorFieldClass = options.errorFieldClass; // popup__item_type_error
    this._inputSectionSelector = options.inputSectionSelector; // popup__form-section
    this._formElement = formElement;
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._buttonSelector);
    }
    
    _showError = (inputElement, errorElement, errorMessage) => {
        errorElement.classList.add(this._errorMessageClass);
        inputElement.classList.add(this._errorFieldClass);
        errorElement.textContent = errorMessage;
    }
    
    _hiddenError = (inputElement, errorElement) => {
        errorElement.classList.remove(this._errorMessageClass);
        inputElement.classList.remove(this._errorFieldClass);
        errorElement.textContent = ''; 
    }
    
    _setInputState = (inputElement, isValid) => {
        const inputSectionElement = inputElement.closest(this._inputSectionSelector);
        const errorElement = inputSectionElement.querySelector(this._inputErrorSelector);
        if (isValid) {
            this._hiddenError(inputElement, errorElement);
        } else {
            this._showError(inputElement, errorElement, inputElement.validationMessage);
        }
    };
    
    _toggleInputState = (inputElement) => {
        const isValid = inputElement.validity.valid;
        this._setInputState(inputElement, isValid);
    };
    
    _toggleButtonState = () => {
        const formIsValid = this._inputsList.every(inputElement => inputElement.validity.valid);
    
        if (formIsValid) {
            this.enableButton(this._buttonElement);
        } else {
            this.disableButton(this._buttonElement);
        } 
    };
    
    _setEventsListeners = () => {    
    this._inputsList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this._toggleButtonState(this._inputsList, this._buttonElement); 
            });
        });
        this._toggleButtonState(this._inputsList, this._buttonElement); 
    };

    _hiddenErrorMessage = (inputElement) => { 
        const inputSectionElement = inputElement.closest(this._inputSectionSelector);
        const errorElement = inputSectionElement.querySelector(this._inputErrorSelector);
        this._hiddenError(inputElement, errorElement);
    };

    clearErrorMessage = () => {
        this._inputsList.forEach(inputElement => {
            this._hiddenErrorMessage(inputElement);
          });
    }

    enableButton = () => {  
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._disabledButtonClass);
    };
    
    disableButton = () => { 
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._disabledButtonClass);
    };

    enableValidation = () => {
    this._setEventsListeners()
    };

    }
    
    export default FormValidator;

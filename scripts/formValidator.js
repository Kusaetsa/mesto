class FormValidator {
    constructor(options, formElement) {
    this._inputSelector = options.inputSelector; // popup__item
    this._inputErrorSelector = options.inputErrorSelector; // popup__item-error
    this._buttonSelector = options.buttonSelector; // popup__button
    this._disabledButtonClass = options.disabledButtonClass; // popup__button_inactive
    this._errorMessageClass = options.errorMessageClass; // popup__item-error_active
    this._errorFieldClass = options.errorFieldClass; // popup__item_type_error
    this._formSelector = options.formSelector; // popup
    this._inputSectionSelector = options.inputSectionSelector; // popup__form-section
    this._formElement = formElement;
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
    
    _enableButton = (buttonElement) => { 
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(this._disabledButtonClass);
    };
    
    _disableButton = (buttonElement) => {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(this._disabledButtonClass);
    };
    
    _toggleButtonState = (inputs, buttonElement) => {
        const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
    
        if (formIsValid) {
            this._enableButton(buttonElement);
        } else {
            this._disableButton(buttonElement);
        } 
    };
    
    _setEventsListeners = () => {
        const buttonElement = this._formElement.querySelector(this._buttonSelector);
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    
        inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this._toggleButtonState(inputs, buttonElement); 
            });
        });
        this._toggleButtonState(inputs, buttonElement); 
    };
    
    enableValidation = () => {
        const formsElement = Array.from(document.querySelectorAll(this._formSelector));
        formsElement.forEach((e) => {
            this._setEventsListeners()
        });
    };
       
    }
    
    export default FormValidator;


const showError = (inputElement, errorElement, errorMessage, validationOptions) => {
    errorElement.classList.add(validationOptions.errorMessageClass);
    inputElement.classList.add(validationOptions.errorFieldClass);
    errorElement.textContent = errorMessage;
}

const hiddenError = (inputElement, errorElement, validationOptions) => {
    errorElement.classList.remove(validationOptions.errorMessageClass);
    inputElement.classList.remove(validationOptions.errorFieldClass);
    errorElement.textContent = ''; 
}

const setInputState = (inputElement, isValid, validationOptions) => {
    const { inputSectionSelector, inputErrorSelector, errorMessageClass } = validationOptions;
    const inputSectionElement = inputElement.closest(inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(inputErrorSelector);
    if (isValid) {
        hiddenError(inputElement, errorElement, validationOptions);
    } else {
        showError(inputElement, errorElement, inputElement.validationMessage, validationOptions);
    }
};

const toggleInputState = (inputElement, validationOptions) => {
    const isValid = inputElement.validity.valid;
    setInputState(inputElement, isValid, validationOptions);
};

const hiddenErrorMessage = (inputElement, validationOptions) => {
    const { inputSectionSelector, inputErrorSelector, errorMessageClass } = validationOptions;
    const inputSectionElement = inputElement.closest(inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(inputErrorSelector);
    hiddenError(inputElement, errorElement, validationOptions);
};

const clearErrorMessage = () => {
    const inputs = Array.from(document.querySelectorAll(validationOptions.inputSelector));
    inputs.forEach(inputElement => {
        hiddenErrorMessage(inputElement, validationOptions);
      });
}

const enableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(disabledButtonClass);
};
    
const toggleButtonState = (inputs, buttonElement, disabledButtonClass) => {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

    if (formIsValid) {
        enableButton(buttonElement, disabledButtonClass);
    } else {
        disableButton(buttonElement, disabledButtonClass);
    } 
};

const setEventsListeners = (formElement, validationOptions) => {
    const buttonElement = formElement.querySelector(validationOptions.buttonSelector);
    const inputs = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));

    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleInputState(inputElement, validationOptions);
            toggleButtonState(inputs, buttonElement, validationOptions.disabledButtonClass); 
        });
    });
    toggleButtonState(inputs, buttonElement, validationOptions.disabledButtonClass); 
};

const enableValidation = ({
    formSelector,
    buttonSelector,
    inputSelector,
    inputSectionSelector,
    inputErrorSelector,
    disabledButtonClass,
    errorMessageClass,
    errorFieldClass,
}) => {
    const formsElement = Array.from(document.querySelectorAll(formSelector));
    formsElement.forEach((formElement) => {
        setEventsListeners(formElement, {
            buttonSelector,
            inputSelector,
            inputSectionSelector,
            inputErrorSelector,
            disabledButtonClass,
            errorMessageClass,
            errorFieldClass,
        });
    });
};



enableValidation(validationOptions);




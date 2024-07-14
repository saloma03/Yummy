export class Contact {
    constructor() {
        this.validations = {
            nameInput: false,
            numberInput: false,
            passwordInput: false,
            confirmInput: false,
            emailInput: false,
            ageInput: false
        };
    }

    validate(elementId, value) {
        let regex = {
            'nameInput': /^[A-Za-z\s]+$/,
            'numberInput': /^01[125]\d{8}$/,
            'passwordInput': /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'confirmInput': /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'emailInput': /^[a-zA-z0-9]{3,}@{1}(gmail|yahoo){1}\.(com){1}$/,
            'ageInput': /^[1-9]\d*$/
        };

        if (elementId === 'confirmInput') {
            const passwordValue = $('#passwordInput').val();
            if (value === passwordValue && regex[elementId].test(value) && value.length === passwordValue.length) {
                $(`#${elementId}`).next('.alert').addClass('hidden');
                this.validations[elementId] = true;
            } else {
                $(`#${elementId}`).next('.alert').removeClass('hidden');
                this.validations[elementId] = false;
            }
        } else {
            if (regex[elementId].test(value)) {
                $(`#${elementId}`).next('.alert').addClass('hidden');
                this.validations[elementId] = true;
            } else {
                $(`#${elementId}`).next('.alert').removeClass('hidden');
                this.validations[elementId] = false;
            }
        }
        this.checkAllValid();
    }

    checkAllValid() {
        const passwordValue = $('#passwordInput').val();
        const confirmValue = $('#confirmInput').val();
        console.log(passwordValue,confirmValue)
        if (confirmValue === passwordValue) {
            $('#confirmInput').next('.alert').addClass('hidden');
            this.validations['confirmInput'] = true;
        } else {
            $('#confirmInput').next('.alert').removeClass('hidden');
            this.validations['confirmInput'] = false;
        }
        
        const allValid = Object.values(this.validations).every(isValid => isValid);
        console.log(allValid);
        $('#submitBtn').prop('disabled', !(allValid && confirmValue === passwordValue));
    }
}

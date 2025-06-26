// ----- In this JavaScript file you will find the code required for the contact form to function ----- //


// Determine language from <html lang="…">, default 'en' if unknown
const rawLang = document.documentElement.lang;
const lang    = ['nl','en'].includes(rawLang) ? rawLang : 'en';

// Translated error messages
const messages = {
    nl: {
        name:       'Voer uw naam in',
        email:      'Voer een geldig e-mailadres in',
        message:    'Voer uw bericht in',
        phoneNumber:'Voer een geldig telefoonnummer in'
    },
    en: {
        name:       'Please enter your name',
        email:      'Please enter a valid email address',
        message:    'Please enter your message',
        phoneNumber:'Please enter a valid phone number'
    }
};

// Shortcut to the right set
const L = messages[lang] || messages.nl;


// ----- For the validation of the contact form ----- //
document.addEventListener('DOMContentLoaded', function() {

    // Form related variables and functions
    const form = document.getElementById('generalForm');

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
        }
    });
  
    function validateForm() {
        let isValid = true;

        // Defines the required fields
        const checks = [
            {
                id: 'name',
                errorId: 'nameError',
                validate: value => value.trim() !== '',
                errorMessage: L.naam
            },
            {
                id: 'email',
                errorId: 'emailError',
                validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                errorMessage: L.email
            },
            {
                id: 'message',
                errorId: 'messageError',
                validate: value => value.trim() !== '',
                errorMessage: L.bericht
            }
        ];
    
        checks.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(field.errorId);
            if (!field.validate(inputElement.value)){
                errorElement.textContent = field.errorMessage;
                inputElement.classList.add('error-border');
                inputElement.classList.remove('valid-border');
                isValid = false;
            } else {
                errorElement.textContent = '';
                inputElement.classList.remove('error-border');
                inputElement.classList.add('valid-border');
            }
        });

        // Phone: Validate only if not empty
        const tel = document.getElementById('phoneNumber');
        const telErr = document.getElementById('phoneNumberError');
        if (tel.value.trim() !== '') {
            const telOK = /^\+?[0-9\s\-]{7,15}$/.test(tel.value);
            if (!telOK) {
                telErr.textContent = L.telefoonnummer;
                tel.classList.add('error-border');
                tel.classList.remove('valid-border');
                isValid = false;
            } else {
                telErr.textContent = '';
                tel.classList.remove('error-border');
                tel.classList.add('valid-border');
            }
        } else {
            telErr.textContent = '';
            tel.classList.remove('error-border');
        }
    
        return isValid;
    }

});
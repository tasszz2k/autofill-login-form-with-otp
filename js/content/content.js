// import { authenticator } from '@otplib/preset-browser';

console.log("AutoFill_with_OTP_Extension content script is running.");

const username_fields = ['username', 'login_username', 'user_login', 'user'];
const password_fields = ['password', 'login_password', 'user_pass'];

function triggerEvents(element) {
    ['input', 'change', 'keydown'].forEach(eventType => {
        const event = new Event(eventType, {'bubbles': true});
        element.dispatchEvent(event);
    });
}

function autoFillFields() {
    const usernameField = document.querySelector(getSelectorString(username_fields));
    const passwordField = document.querySelector(getSelectorString(password_fields));


    chrome.storage.sync.get(['username', 'password', 'secret'], function (data) {
        console.log("Fetched values from storage -", data);

        if (usernameField && data.username && !usernameField.value) {
            usernameField.value = data.username;
            triggerEvents(usernameField);
            console.log("Filled username field with:", data.username);
        } else {
            console.log("Could not fill username field.");
        }

        if (passwordField && data.password && !passwordField.value) {
            const otp = generateOTP(data.secret);
            passwordField.value = data.password + otp;
            triggerEvents(passwordField);
            console.log("Filled password field with:", data.password + otp);
        } else {
            console.log("Could not fill password field.");
        }
    });
}

window.addEventListener('load', function () {
    console.log("Window loaded. Now attempting to autofill...");
    setTimeout(autoFillFields, 1000);
});


function generateOTP(secret) {
    // Your logic to generate OTP.
    let otp = window.otplib.authenticator.generate(secret);
    console.log("Generated OTP:", otp);
    return otp;
}

// support both id and name attributes
function getSelectorString(selectors) {
    // format: input[name="username"], input[id="username"], ...
    return selectors.map(selector => `input[name="${selector}"], input[id="${selector}"]`).join(', ');

}


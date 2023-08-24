// import { authenticator } from '@otplib/preset-browser';

console.log("AutoFill_with_OTP_Extension content script is running.");

function triggerEvents(element) {
    ['input', 'change', 'keydown'].forEach(eventType => {
        const event = new Event(eventType, { 'bubbles': true });
        element.dispatchEvent(event);
    });
}

window.addEventListener('load', function () {
    console.log("Window loaded. Now attempting to autofill...");

    const usernameField = document.querySelector('input[name="username"], input[id="login_username"], input[id="user_login"]');
    const passwordField = document.querySelector('input[name="password"], input[id="login_password"], input[id="user_pass"]');

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
});


function generateOTP(secret) {
    // Your logic to generate OTP.
    let otp = window.otplib.authenticator.generate(secret);
    console.log("Generated OTP:", otp);
    return otp;
}



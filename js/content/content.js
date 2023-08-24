document.addEventListener('DOMContentLoaded', function() {
    const usernameField = document.querySelector('[name="username"]');
    const passwordField = document.querySelector('[name="password"]');

    chrome.storage.sync.get(['username', 'password', 'secret'], function(data) {
        if (usernameField && data.username) {
            usernameField.value = data.username;
        }
        if (passwordField && data.password) {
            const otp = generateOTP(data.secret); // You need to implement generateOTP
            passwordField.value = data.password + otp;
        }
        // FIXME: just to debug
        console.log(data)
        console.log(passwordField.value)
    });
});

function generateOTP(secret) {
    // Use a library or logic to generate OTP based on the secret.
    // For example, you could use an external library like "otp-generator" 
    // or something similar to generate the OTP.
    return "123456"; // Placeholder. Replace with actual OTP.
}

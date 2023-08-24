console.log("AutoFill_with_OTP_Extension content script is running.");

window.addEventListener('load', function () {
    console.log("Window loaded. Now attempting to autofill...");

    const usernameField = document.querySelector('[name="username"]');
    const passwordField = document.querySelector('[name="password"]');

    chrome.storage.sync.get(['username', 'password', 'secret'], function (data) {
        console.log("Fetched values from storage -", data);

        if (usernameField && data.username) {
            usernameField.value = data.username;
            console.log("Filled username field with:", data.username);
        } else {
            console.log("Could not fill username field.");
        }

        if (passwordField && data.password) {
            const otp = generateOTP(data.secret);
            passwordField.value = data.password + otp;
            console.log("Filled password field with:", data.password + otp);
        } else {
            console.log("Could not fill password field.");
        }
    });
});


function generateOTP(secret) {
    // Use a library or logic to generate OTP based on the secret.
    // For example, you could use an external library like "otp-generator"
    // or something similar to generate the OTP.
    return "123456"; // Placeholder. Replace with actual OTP.
}


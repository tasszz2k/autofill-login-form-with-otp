document.getElementById('saveBtn').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const secret = document.getElementById('secret').value;
    const urlPatterns = document.getElementById('urlPatterns').value.split('\n');

    chrome.storage.sync.set({
        username: username,
        password: password,
        secret: secret,
        urlPatterns: urlPatterns,
    }, function () {
        if (chrome.runtime.lastError) {
            console.error("Error saving settings:", chrome.runtime.lastError);
        } else {
            console.log("Settings saved successfully.");
            console.log("Saved values - Username:", username, "Password:", password, "Secret:", secret);
        }
    });

    showNotification("Configurations saved successfully.", "success");

});


document.addEventListener('DOMContentLoaded', function () {
    // Fetch configurations and populate the form fields
    chrome.storage.sync.get(['username', 'password', 'secret', 'urlPatterns'], function (data) {
        document.getElementById('username').value = data.username || '';
        document.getElementById('password').value = data.password || '';
        document.getElementById('secret').value = data.secret || '';
        document.getElementById('urlPatterns').value = (data.urlPatterns && data.urlPatterns.join('\n')) || '';
    });

    // 2. Show current configurations, mask sensitive data
    chrome.storage.sync.get(['username', 'urlPatterns'], function (data) {
        document.getElementById('username').textContent = data.username || 'Not set';
        document.getElementById('urlPatterns').textContent = (data.urlPatterns && data.urlPatterns.join(', ')) || 'Not set';
    });
});



//3. UI user have a button copy password (password+OTP)
document.getElementById('copyPasswordBtn').addEventListener('click', function () {
    showNotification("Clicked", "error"); // Added error notification

    chrome.storage.sync.get(['password', 'secret'], function (data) {
        if (data.password && data.secret) {
            const otp = generateOTP(data.secret);
            const combinedPassword = data.password + otp;
            copyToClipboard(combinedPassword);
            showNotification("Password + OTP copied to clipboard.", "success"); // Moved inside the callback
        } else {
            console.log("Cannot generate OTP and copy combined password");
            showNotification("Failed to copy. Check your configurations.", "error"); // Added error notification
        }
    });
});

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}


function showNotification(message, type) {
    const notificationElement = document.getElementById('notification');

    notificationElement.textContent = message;
    notificationElement.className = `notification ${type} show`;

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notificationElement.className = 'notification';
    }, 1000);
}


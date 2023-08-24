document.getElementById('saveBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const secret = document.getElementById('secret').value;

    chrome.storage.sync.set({
        username: username,
        password: password,
        secret: secret
    }, function() {
        if (chrome.runtime.lastError) {
            console.error("Error saving settings:", chrome.runtime.lastError);
        } else {
            console.log("Settings saved successfully.");
            console.log("Saved values - Username:", username, "Password:", password, "Secret:", secret);
        }
    });
});

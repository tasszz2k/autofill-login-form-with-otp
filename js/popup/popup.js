document.getElementById('saveBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const secret = document.getElementById('secret').value;

    chrome.storage.sync.set({
        username: username,
        password: password,
        secret: secret
    }, function() {
        console.log("Settings saved.");
    });
});

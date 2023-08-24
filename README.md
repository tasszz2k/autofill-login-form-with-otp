# AutoFill-with-OTP
The AutoFill with OTP Chrome extension provides an automated solution to fill in usernames and passwords—augmented with One-Time Passwords (OTP)—on specified web pages. The extension aims to streamline the login process for websites, especially those requiring an additional layer of security through OTPs, without compromising user data security.


```
AutoFill_with_OTP_Extension/
│
├── _locales/                  # For internationalization (if needed)
│   ├── en/
│   │   └── messages.json
│   └── [other languages]/
│
├── assets/                    # Store images and other assets
│   ├── images/
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   └── ...
│
├── js/
│   ├── background/
│   │   └── background.js      # Background script logic
│   │
│   ├── content/
│   │   └── content.js         # Content script logic
│   │
│   ├── popup/
│   │   └── popup.js           # JS for popup controls and interactions
│   │
│   └── libs/
│       └── [libraries].js     # External libraries, e.g., OTP generation library
│
├── css/
│   └── popup.css              # Styling for the popup if needed
│
├── html/
│   └── popup.html             # HTML structure of the popup
│
├── manifest.json              # Manifest file
│
└── README.md                  # Project documentation and instructions
```
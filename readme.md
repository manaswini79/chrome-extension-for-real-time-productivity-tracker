Productivity Tracker Chrome Extension

Track personal productivity, set daily goals, monitor time on websites, and visualize trends with a React-based Chrome extension.

Features

Set daily goals (minutes)
Track time per website
View bar chart overview
Data persists in chrome.storage.local

Setup & Development
Clone the repo:

git clone https://github.com/your-username/your-repo-name.git
cd chrome-extension-for-real-time-productivity-tracker

Install dependencies:
npm install

Run in development mode (for testing UI):
npm run dev

Note: Chrome APIs only work when loaded in Chrome extension.

Build Extension
npm run build

Generates dist/ folder with index.html, manifest.json, background.js, icon-128.png, and compiled assets.

Load in Chrome
Go to chrome://extensions/
Enable Developer mode
Click Load unpacked → select dist/
Click the extension icon to open the popup

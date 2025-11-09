# Productivity Tracker Chrome Extension

Track personal productivity, set daily goals, monitor time on websites, and visualize trends with a React-based Chrome extension.  

**Features:**  
- Set daily goals (minutes)  
- Track time per website  
- View bar chart overview  
- Data persists in `chrome.storage.local`  

**Setup & Development:**  
1. Clone the repo:  
```bash
git clone https://github.com/your-username/your-repo-name.git
cd chrome-extension-for-real-time-productivity-tracker
```
2. Install dependencies:
   ```bash
   npm install
   ```

4. Run in development mode (for testing UI):
   ```bash
   npm run dev
   ```
 
6. Build Extension:
   ```bash
    npm run build
   ```
     
    This generates a dist/ folder containing index.html, manifest.json, background.js, icon-128.png, and compiled JS/CSS assets.
  
8. Load in Chrome:
   - Open Chrome → chrome://extensions/
   - Enable Developer mode
   - Click Load unpacked → select the dist/ folder
   - Click the extension icon in the toolbar to open the popup

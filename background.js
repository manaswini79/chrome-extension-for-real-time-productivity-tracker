// background.js
// Manifest v3 service worker for tracking active tab time with chrome.alarms

const TICK_MINUTES = 1; // granularity in minutes

// Helper: get today's key (YYYY-MM-DD)
function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

// Get active tab URL domain (returns null if none or not applicable)
async function getActiveDomain() {
  try {
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    if (!tabs || !tabs.length) return null;
    const tab = tabs[0];
    if (!tab.url) return null;
    try {
      const url = new URL(tab.url);
      return url.hostname.replace(/^www\./, '');
    } catch (e) {
      return null;
    }
  } catch (e) {
    console.error('getActiveDomain error', e);
    return null;
  }
}

// Increment timeSpent for domain for today's date by minutes
async function incrementTime(domain, minutes = TICK_MINUTES) {
  if (!domain) return;
  const dateKey = todayKey();
  const storeKey = `time_${dateKey}`;

  const data = await chrome.storage.local.get([storeKey]);
  const value = data[storeKey] || {};
  value[domain] = (value[domain] || 0) + minutes;
  await chrome.storage.local.set({ [storeKey]: value });
}

// Called each alarm tick
async function handleTick() {
  // check idle state - if user idle longer than threshold, don't count
  chrome.idle.queryState(60, async (state) => { // idle threshold 60 sec
    if (state !== 'active') {
      // user is idle or locked - skip counting
      return;
    }

    // ensure a window is focused (not minimized)
    // We will check lastFocusedWindow via tabs query
    const domain = await getActiveDomain();
    if (!domain) return;

    await incrementTime(domain, TICK_MINUTES);
    // Also update a small 'lastUpdate' item to make UI reactive if needed
    await chrome.storage.local.set({ lastTick: Date.now() });
  });
}

// Setup alarm on install or service worker start
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('tick', { periodInMinutes: TICK_MINUTES });
  console.log('Installed productivity tracker, alarm created');
});

// Ensure alarm exists on startup
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create('tick', { periodInMinutes: TICK_MINUTES });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm && alarm.name === 'tick') {
    handleTick().catch(console.error);
  }
});

// Also when a tab becomes active/updated we can record a quick tick (optional)
chrome.tabs.onActivated.addListener((info) => {
  // small immediate check (do not overcount) — just allow background alarm to track periodic minutes
  // We update a 'lastActiveTab' key to make popup show current domain quickly
  getActiveDomain().then(domain => {
    if (domain) chrome.storage.local.set({ currentDomain: domain, lastTick: Date.now() });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    getActiveDomain().then(domain => {
      if (domain) chrome.storage.local.set({ currentDomain: domain, lastTick: Date.now() });
    });
  }
});

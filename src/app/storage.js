export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

// Get time object for today: { domain: minutes, ... }
export async function getTimeForToday() {
  const key = 'time_' + todayKey()

  // Dev fallback if chrome.storage is not available
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return {}

  return new Promise((resolve) => {
    chrome.storage.local.get([key], (obj) => {
      resolve(obj[key] || {})
    })
  })
}

export async function setGoal(minutes) {
  const key = 'goal_' + todayKey()
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: minutes }, resolve)
  })
}

export async function getGoal() {
  const key = 'goal_' + todayKey()
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return 0
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (obj) => {
      resolve(obj[key] || 0)
    })
  })
}

export async function clearToday() {
  const t = todayKey()
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return
  return new Promise((resolve) => {
    chrome.storage.local.remove(['time_' + t, 'goal_' + t], resolve)
  })
}

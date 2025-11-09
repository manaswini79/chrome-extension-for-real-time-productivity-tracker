import React, { useEffect, useState } from 'react'
import { getTimeForToday, getGoal, setGoal, todayKey } from './storage'
import SitesList from './SitesList'
import Goals from './Goals'
import ChartView from './ChartView'

export default function App() {
  const [timeData, setTimeData] = useState({})
  const [goal, setGoalState] = useState(0)
  const [currentDomain, setCurrentDomain] = useState(null)
  const [lastTick, setLastTick] = useState(0)

  useEffect(() => {
    async function load() {
      const t = await getTimeForToday()
      setTimeData(t)
      const g = await getGoal()
      setGoalState(g)
    }
    load()

    // Only attach listener if running in Chrome extension
    if (typeof chrome !== 'undefined' && chrome.storage?.onChanged?.addListener) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local') return
        const tk = 'time_' + todayKey()
        if (changes[tk]) {
          setTimeData(changes[tk].newValue || {})
        }
        if (changes['lastTick']) setLastTick(Date.now())
        if (changes['currentDomain'])
          setCurrentDomain(changes['currentDomain'].newValue)
      })
    }
  }, [])

  async function onSetGoal(minutes) {
    await setGoal(minutes)
    setGoalState(minutes)
  }

  return (
    <div>
      <div className="card header">
        <h2>Productivity Tracker</h2>
        <div className="small">{todayKey()}</div>
      </div>

      <div className="card">
        <Goals goal={goal} onSetGoal={onSetGoal} />
      </div>

      <div className="card">
        <h3 style={{ margin: 0 }}>Today - per-site</h3>
        <div className="small" style={{ marginTop: 6 }}>
          Current: {currentDomain || '—'}
        </div>
        <SitesList data={timeData} />
      </div>

      <div className="card">
        <ChartView data={timeData} goal={goal} />
      </div>
    </div>
  )
}

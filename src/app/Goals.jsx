import React, { useState } from 'react'

export default function Goals({ goal, onSetGoal }) {
  const [input, setInput] = useState(goal || '')

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>Daily goal (minutes)</strong>
        <div className="small">{goal || 0} min</div>
      </div>
      <div className="goals">
        <input className="input" placeholder="Set minutes" value={input} onChange={e=>setInput(e.target.value)} />
        <button className="btn" onClick={() => { const m = parseInt(input||0,10); if (!isNaN(m)) onSetGoal(m) }}>Save</button>
      </div>
    </div>
  )
}

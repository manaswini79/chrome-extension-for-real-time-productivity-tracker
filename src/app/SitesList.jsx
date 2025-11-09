import React from 'react'

function minutesToHhMm(min) {
  const h = Math.floor(min/60)
  const m = min % 60
  return h ? `${h}h ${m}m` : `${m}m`
}

export default function SitesList({ data }) {
  const entries = Object.entries(data || {}).sort((a,b)=>b[1]-a[1])
  if (entries.length === 0) return <div className="small">No data yet — open websites and keep the popup closed for periodic tracking to occur.</div>
  return (
    <div style={{marginTop:8}}>
      {entries.map(([domain, min]) => (
        <div key={domain} className="site-row">
          <div style={{fontWeight:500}}>{domain}</div>
          <div className="small">{minutesToHhMm(min)}</div>
        </div>
      ))}
    </div>
  )
}

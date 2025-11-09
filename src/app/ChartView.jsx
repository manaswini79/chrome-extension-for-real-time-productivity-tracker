import React, { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register all necessary chart components
ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function ChartView({ data, goal }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    const labels = Object.keys(data || {})
    const values = Object.values(data || {})

    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }

    chartRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Minutes',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [data])

  const total = Object.values(data || {}).reduce((sum, v) => sum + v, 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Overview</strong>
        <div className="small">
          Total: {total}m {goal ? ` / ${goal}m` : ''}
        </div>
      </div>
      <div style={{ height: 140, marginTop: 8 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

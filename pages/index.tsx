import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Entry {
  date: string
  score: number
}

function mapScoreToColor(score: number): string {
  const h = 135
  const s = score
  const l = 50
  const a = s / 100
  const q = l < 50 ? l * (1 + a) : l + a - l * a
  const p = 2 * l - q
  const hk = h / 360
  const r = Math.round(255 * hue2rgb(p, q, hk + 1/3))
  const g = Math.round(255 * hue2rgb(p, q, hk))
  const b = Math.round(255 * hue2rgb(p, q, hk - 1/3))
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
function hue2rgb(p:number,q:number,t:number){if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p}
function toHex(n:number){const h=n.toString(16);return h.length===1?'0'+h:h}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    const stored = localStorage.getItem('entries')
    if (stored) setEntries(JSON.parse(stored))
  }, [])
  return (
    <div>
      <h1>Mood Grid</h1>
      <div className="grid">
        {Array.from({ length: 7 }).map((_, i) => {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const date = d.toISOString().slice(0,10)
          const entry = entries.find(e => e.date === date)
          const color = entry ? mapScoreToColor(entry.score) : '#E0E0E0'
          return <div key={i} className="tile" style={{background: color}}></div>
        })}
      </div>
      <Link href="/entry"><button className="add-button">Add Journal Entry</button></Link>
    </div>
  )
}

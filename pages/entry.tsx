import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Entry() {
  const [text, setText] = useState('')
  const router = useRouter()
  async function save() {
    const res = await fetch('/api/sentiment', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})})
    const { score } = await res.json()
    const entry = { date: new Date().toISOString().slice(0,10), text, score }
    const entries = JSON.parse(localStorage.getItem('entries')||'[]')
    entries.push(entry)
    localStorage.setItem('entries', JSON.stringify(entries))
    router.push('/')
  }
  return (
    <div style={{padding:20}}>
      <textarea placeholder="Today I felt..." value={text} onChange={e=>setText(e.target.value)} style={{width:'100%',height:'200px'}} />
      <button onClick={save} disabled={!text}>Save Entry</button>
    </div>
  )
}

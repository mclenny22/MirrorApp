const { useState, useEffect } = React;

function mapScoreToColor(score) {
  const h = 135;
  const s = score;
  const l = 50;
  const a = s / 100;
  const q = l < 50 ? l * (1 + a) : l + a - l * a;
  const p = 2 * l - q;
  const hk = h / 360;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const toHex = n => {
    const h = n.toString(16);
    return h.length === 1 ? '0' + h : h;
  };
  const r = Math.round(255 * hue2rgb(p, q, hk + 1 / 3));
  const g = Math.round(255 * hue2rgb(p, q, hk));
  const b = Math.round(255 * hue2rgb(p, q, hk - 1 / 3));
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function Home({ entries, onAdd }) {
  return (
    <div>
      <h1>Mood Grid</h1>
      <div className="grid">
        {Array.from({ length: 7 }).map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const date = d.toISOString().slice(0, 10);
          const entry = entries.find(e => e.date === date);
          const color = entry ? mapScoreToColor(entry.score) : '#E0E0E0';
          return <div key={i} className="tile" style={{ background: color }}></div>;
        })}
      </div>
      <button className="add-button" onClick={onAdd}>Add Journal Entry</button>
    </div>
  );
}

function Entry({ onSave }) {
  const [text, setText] = useState('');
  return (
    <div style={{ padding: 20 }}>
      <textarea
        placeholder="Today I felt..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ width: '100%', height: '200px' }}
      />
      <button onClick={() => onSave(text)} disabled={!text}>Save Entry</button>
    </div>
  );
}

function App() {
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState('home');
  useEffect(() => {
    const stored = localStorage.getItem('entries');
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  async function save(text) {
    const res = await fetch('/api/sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const { score } = await res.json();
    const entry = { date: new Date().toISOString().slice(0, 10), text, score };
    const updated = [...entries, entry];
    setEntries(updated);
    localStorage.setItem('entries', JSON.stringify(updated));
    setView('home');
  }

  return view === 'home' ? (
    <Home entries={entries} onAdd={() => setView('entry')} />
  ) : (
    <Entry onSave={save} />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

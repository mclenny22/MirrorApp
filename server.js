const express = require('express');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
let entries = [];
let insights = [];

app.post('/api/sentiment', async (req, res) => {
  const { text } = req.body;
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Return a positivity score 0-100 as a number.' },
      { role: 'user', content: text }
    ],
    model: 'gpt-3.5-turbo'
  });
  const score = parseInt(completion.choices[0].message.content || '50', 10);
  res.json({ score });
});

app.post('/api/deepprompt', async (req, res) => {
  const { text } = req.body;
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Return a short reflective question based on the text.' },
      { role: 'user', content: text }
    ],
    model: 'gpt-3.5-turbo'
  });
  const prompt = completion.choices[0].message.content?.trim() || '';
  res.json({ prompt });
});

app.get('/api/entries', (req, res) => {
  res.json(entries);
});

app.post('/api/entries', (req, res) => {
  const entry = { id: Date.now(), ...req.body };
  entries.push(entry);
  res.json({ id: entry.id, saved: true });
});

app.get('/api/insights', (req, res) => {
  res.json(insights);
});

app.post('/api/insights', async (req, res) => {
  const { entries: ent } = req.body;
  const prompt = `Summarize the following entries:\n${ent.map(e => e.text).join('\n')}`;
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Write a short weekly insight' },
      { role: 'user', content: prompt }
    ],
    model: 'gpt-3.5-turbo'
  });
  const body = completion.choices[0].message.content?.trim() || '';
  const insight = { id: Date.now(), date: new Date().toISOString(), body };
  insights.push(insight);
  res.json({ id: insight.id, saved: true });
});

app.post('/api/keywords', async (req, res) => {
  const { text } = req.body;
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Extract 5 keywords from the text as a JSON array.' },
      { role: 'user', content: text }
    ],
    model: 'gpt-3.5-turbo'
  });
  let keywords = [];
  try {
    keywords = JSON.parse(completion.choices[0].message.content || '[]');
  } catch {}
  res.json({ keywords });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

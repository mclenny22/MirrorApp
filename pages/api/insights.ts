import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
let insights: any[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.json(insights)
  } else if (req.method === 'POST') {
    const { entries } = req.body
    const prompt = `Summarize the following entries:\n${entries.map((e:any)=>e.text).join('\n')}`
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'Write a short weekly insight' }, { role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo'
    })
    const body = completion.choices[0].message.content?.trim() || ''
    const insight = { id: Date.now(), date: new Date().toISOString(), body }
    insights.push(insight)
    res.json({ id: insight.id, saved: true })
  } else {
    res.status(405).end()
  }
}

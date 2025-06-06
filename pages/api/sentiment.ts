import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { text } = req.body
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'Return a positivity score 0-100 as a number.' }, { role: 'user', content: text }],
    model: 'gpt-3.5-turbo'
  })
  const score = parseInt(completion.choices[0].message.content || '50', 10)
  res.json({ score })
}

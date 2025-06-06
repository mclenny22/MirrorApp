import type { NextApiRequest, NextApiResponse } from 'next'

let entries: any[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.json(entries)
  } else if (req.method === 'POST') {
    const entry = { id: Date.now(), ...req.body }
    entries.push(entry)
    res.json({ id: entry.id, saved: true })
  } else {
    res.status(405).end()
  }
}

import { deta } from '@/config/deta'
import { initNote } from '@/types/notes'
import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'
const db = deta.Base('notes')

export const getNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.key) {
    const note = await db.get(req.query.key as string)
    return res.status(200).json(note)
  }
  const fetch = await db.fetch()
  return res.status(200).json(fetch)
}

export const postNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  const newNote = await db.put({
    ...initNote,
    key: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return res.status(200).json(newNote)
}

export const putNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { key } = req.body
  const data = { ...req.body, updatedAt: new Date().toISOString() }
  const update = await db.put(data, key)
  return res.status(200).json(update)
}

export const deleteNotes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { key } = req.body
  const del = await db.delete(key)
  return res.status(200).json(del)
}

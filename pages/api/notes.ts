import { deleteNotes, getNotes, postNotes, putNotes } from '@/lib/api/notes'
import type { NextApiRequest, NextApiResponse } from 'next'
// @methods [GET,POST,PUT,DELETE]

export default async function notes(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getNotes(req, res)

    case 'POST':
      return postNotes(req, res)

    case 'PUT':
      return putNotes(req, res)

    case 'DELETE':
      return deleteNotes(req, res)
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

import { Note } from '@/types/notes'
import { toast } from 'react-hot-toast'

export const clientPutNote = async (note: Note) => {
  const res = await fetch(`/api/notes`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(note),
  })
  if (res.ok) {
    toast.success('Note saved')
  }
}

export const clientUpdateNote = async (note: Note) => {
  const res = await fetch(`/api/notes`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(note),
  })
}

export const clientDeleteNote = async (key: string) => {
  const res = await fetch(`/api/notes`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ key }),
  })
  if (res.ok) {
    toast.success('Note deleted')
  }
}

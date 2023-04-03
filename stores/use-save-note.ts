import { Note } from '@/types/notes'
import { toast } from 'react-hot-toast'
import { create } from 'zustand'

interface Props {
  isSaving: boolean
  saveNote: (note: Note) => Promise<void>
  backgroundSaveNote: (note: Note) => Promise<void>
}

export const useSaveNoteStore = create<Props>((set) => ({
  isSaving: false,
  saveNote: async (note: Note) => {
    set({ isSaving: true })
    const res = await fetch(`/api/notes`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(note),
    })
    if (res.ok) {
      toast.success('Note saved')
      set((s) => ({ ...s, isSaving: false }))
    }
    set({ isSaving: false })
  },
  backgroundSaveNote: async (note: Note) => {
    set({ isSaving: true })
    await fetch(`/api/notes`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(note),
    })
    set({ isSaving: false })
  },
}))

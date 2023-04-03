import { initNote, Note } from '@/types/notes'
import { create } from 'zustand'

interface Props {
  note: Note
  setNote: (note: Note) => void
  setOpening: (opening: Note['opening']) => void
  setPlayingAs: (playingAs: Note['playingAs']) => void
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  setTags: (tags: Note['tags']) => void
  addToBody: (element: any) => void
  removeBodyElement: (key: string) => void
  updateBodyElement: (key: string, element: any) => void
}

export const useNoteStore = create<Props>((set) => ({
  note: initNote,
  setNote: (note) => set((s) => ({ note })),
  setOpening: (opening) => set((s) => ({ note: { ...s.note, opening } })),
  setPlayingAs: (playingAs) => set((s) => ({ note: { ...s.note, playingAs } })),
  handleInput: (e) => {
    const { name, value } = e.target
    set((s) => ({ note: { ...s.note, [name]: value } }))
  },
  setTags: (tags) => set((s) => ({ note: { ...s.note, tags } })),
  addToBody: (element) =>
    set((s) => ({ note: { ...s.note, body: [...s.note.body, element] } })),
  removeBodyElement: (key) =>
    set((s) => ({
      note: {
        ...s.note,
        body: s.note.body.filter((el) => el.key !== key),
      },
    })),
  updateBodyElement: (key, element) =>
    set((s) => ({
      note: {
        ...s.note,
        body: s.note.body.map((el) => (el.key === key ? element : el)),
      },
    })),
}))

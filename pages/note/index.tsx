import { AddNoteLayout } from '@/components/layout/add-note'
import React from 'react'

import NoteForm from '@/components/note/form'
import { useNoteStore } from '@/stores/use-note'

const AddNote = () => {
  const useNote = useNoteStore((s) => s)
  return (
    <AddNoteLayout>
      <div className='space-y-2 '>
        <NoteForm />
        <button
          className='w-full px-3 py-2 rounded bg-[#d0d0d0] text-black'
          onClick={() => {
            console.log(useNote.note)
          }}
        >
          log
        </button>
      </div>
    </AddNoteLayout>
  )
}

export default AddNote

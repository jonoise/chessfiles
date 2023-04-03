import Tooltip from '@/components/shared/tooltip'
import { useNoteStore } from '@/stores/use-note'
import { useSaveNoteStore } from '@/stores/use-save-note'
import React from 'react'
import { IoSaveOutline } from 'react-icons/io5'

export const SaveButton = () => {
  const useNote = useNoteStore((s) => s)
  const useSaveNote = useSaveNoteStore((s) => s)
  return (
    <div className=' flex flex-col items-center space-y-2 pb-4 border-t pt-2 border-zinc-500'>
      <p className='text-xs'>save</p>

      <Tooltip side='right' content='Save Note'>
        <button
          onClick={() => useSaveNote.saveNote(useNote.note)}
          className=' text-zinc-900'
        >
          <IoSaveOutline />
        </button>
      </Tooltip>
    </div>
  )
}

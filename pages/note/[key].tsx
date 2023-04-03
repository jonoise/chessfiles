import { AddNoteLayout } from '@/components/layout/add-note'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import NoteForm from '@/components/note/form'
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'
import { AnimatePresence, motion } from 'framer-motion'
import { NoteLoader } from '@/components/shared/loaders'
import { useNoteStore } from '@/stores/use-note'
import { NoteBody } from '@/components/note/body'

const NewNoteDetails = () => {
  const router = useRouter()
  const useNote = useNoteStore((s) => s)
  const { data: note } = useSWR(
    router.isReady && `/api/notes?key=${router.query.key}`,
    fetcher
  )

  useEffect(() => {
    if (note) {
      useNote.setNote(note)
    }
  }, [note])

  return (
    <AnimatePresence mode='wait'>
      {!note && <NoteLoader />}
      {note && (
        <motion.div
          key={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AddNoteLayout>
            <div className=''>
              <NoteForm />
              <NoteBody body={useNote.note.body} />
            </div>
          </AddNoteLayout>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NewNoteDetails

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useSWR from 'swr'
import { ChessifyLogo } from '@/components/shared/logo'
import { useRouter } from 'next/router'
import { fetcher } from '@/lib/fetcher'
import { Note } from '@/types/notes'
import { NoteLink } from '@/components/home/note-link'

const HomePage = () => {
  const router = useRouter()
  const { data: notes } = useSWR<{ items: Note[] }>(`/api/notes`, fetcher)

  const createNote = async () => {
    const res = await fetch(`/api/notes`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    })
    if (res.ok) {
      const data = await res.json()
      router.push(`/note/${data.key}`)
    }
  }

  return (
    <div className='flex flex-col items-center space-x-2 px-4 md:px-20 lg:px-52 xl:px-96 space-y-5'>
      <div className='flex w-full items-center space-x-2 mt-20'>
        <ChessifyLogo />
        <input
          type='text'
          className='border py-2 rounded-full w-full px-4'
          placeholder='🔍 Search your notes by opening, move or variation'
        />
        <button
          onClick={createNote}
          className='min-w-fit px-4 py-2 rounded-full border'
        >
          🔖 Add note
        </button>
      </div>
      <AnimatePresence mode='wait'>
        {!notes && (
          <motion.div
            key={'loading-notes'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 1.5 } }}
          >
            Loading your notes.
          </motion.div>
        )}
        {notes && (
          <motion.div
            key={'notes-list'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3'
          >
            {notes.items.map((note) => {
              return <NoteLink key={note.key} note={note} />
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage

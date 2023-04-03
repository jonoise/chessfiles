import React, { FC, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { Nav } from './nav'
import { useAddNoteModal } from '@/components/add-note-modal'
export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { setShowAddNoteModal, AddNoteModal } = useAddNoteModal()
  return (
    <>
      <AddNoteModal />
      <motion.div
        key={'main'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
        className='w-full h-full flex relative'
      >
        <div className='w-40 bg-[#272522] h-screen fixed top-0 left-0 hidden lg:flex lg:flex-col space-y-4'>
          <div className='p-4'>
            <p>CHESSIFY</p>
            <p className='text-[9px]'>Take notes of your games.</p>
          </div>
          <button onClick={() => setShowAddNoteModal(true)}>
            <p className='font-bold text-xl hover:bg-black px-4 py-2 cursor-pointer'>
              🔖 Add Note
            </p>
          </button>
        </div>
        <div className='flex flex-col lg:pl-40 w-full'>
          <Nav />
          <div>{children}</div>
        </div>
      </motion.div>
    </>
  )
}

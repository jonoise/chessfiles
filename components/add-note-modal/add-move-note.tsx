import React, { FC, useEffect } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { MoveNote } from '@/types/notes'
import { nanoid } from 'nanoid'

interface Props {
  setMoveNotes: React.Dispatch<React.SetStateAction<MoveNote[]>>
}

export const AddMoveNote: FC<Props> = ({ setMoveNotes }) => {
  const [showForm, setShowForm] = React.useState(false)
  const [formData, setFormData] = React.useState<MoveNote>({
    turn: '',
    turnMoves: '',
    note: '',
    type: 'move',
    key: nanoid(),
  })

  const parentControls = useAnimationControls()
  const childControls = useAnimationControls()

  useEffect(() => {
    if (showForm) {
      parentControls.start({
        height: '300px',
      })

      childControls.start({
        opacity: 1,
        transition: {
          delay: 0.2,
        },
      })
    } else {
      parentControls.start({
        height: 0,
      })

      childControls.start({
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      })
    }
  }, [showForm])

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Add Move Note</button>
      <motion.div
        animate={parentControls}
        className='bg-zinc-800 rounded space-y-2 mt-4'
      >
        <motion.div animate={childControls} className='px-4 pt-4 space-y-4'>
          <input
            type='text'
            placeholder='Turn'
            className='w-full px-3 py-2 rounded'
            value={formData.turn}
            onChange={(e) => setFormData({ ...formData, turn: e.target.value })}
          />
          <input
            type='text'
            placeholder='Turn Moves'
            className='w-full px-3 py-2 rounded'
            value={formData.turnMoves}
            onChange={(e) =>
              setFormData({ ...formData, turnMoves: e.target.value })
            }
          />
          <textarea
            placeholder='Note'
            className='min-h-[100px] w-full px-3 py-2 rounded'
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />
          <button
            onClick={() => {
              setMoveNotes((prev) => [...prev, formData])
              setFormData({
                turn: '',
                turnMoves: '',
                note: '',
                type: 'move',
                key: nanoid(),
              })
            }}
            className='w-full py-2 rounded bg-brand-primary'
          >
            <span className='text-white'>Save</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

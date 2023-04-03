import { openings } from '@/data/openings'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Modal, UseModalProps } from '../shared/modal'
import Select from 'react-select'
import { Opening } from '@/types/opening'
import { Chessboard } from './chessboard'
import { AddMoveNote } from './add-move-note'
import { toast } from 'react-hot-toast'

export const AddNoteModal: FC<UseModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const [selectedOpening, setSelectedOpening] = useState<Opening | null>(null)
  const [moveNotes, setMoveNotes] = useState<any[]>([])
  const [generalNote, setGeneralNote] = useState('')
  const [variation, setVariation] = useState('')
  const [gameUrl, setGameUrl] = useState('')

  const randomOpening = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * openings.length)
    return openings[randomIndex].name
  }, [])

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    }

    document.addEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const body = {
              selectedOpening,
              moveNotes,
              variation,
              generalNote,
              gameUrl,
            }
            const res = await fetch('/api/notes', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(body),
            })
            if (res.ok) {
              toast.success('Note saved!')
            } else {
              toast.error('Something went wrong')
            }
          }}
          className='p-4 bg-zinc-900 rounded flex flex-col xl:flex-row xl:space-x-5 w-full min-h-screen overflow-y-auto'
        >
          <div className='flex flex-col space-y-2 xl:w-1/3'>
            <label className={labelClassname}>Opening</label>
            <Select
              onChange={(opening) => setSelectedOpening(opening)}
              placeholder={randomOpening}
              options={openings}
              className='text-black'
            />
            <input
              type='text'
              placeholder='Variation'
              className='w-full px-3 py-2 rounded'
              value={variation}
              onChange={(e) => setVariation(e.target.value)}
            />
            <input
              type='text'
              placeholder='https://www.chess.com/game/live/73638078255'
              className='w-full px-3 py-2 rounded'
              value={gameUrl}
              onChange={(e) => setGameUrl(e.target.value)}
            />

            <textarea
              placeholder='General notes for this position'
              className='min-h-[100px] px-3 py-2 rounded'
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
            />
          </div>
          <div className='xl:w-1/3'>
            <h1>Notes per move</h1>
            <p>Add notes on specific moves of your game</p>
            <AddMoveNote setMoveNotes={setMoveNotes} />
            <div className='space-y-2 mt-2'>
              {moveNotes.map((moveNote) => (
                <div key={moveNote.id} className='rounded bg-zinc-800 p-2'>
                  <div className='flex space-x-2'>
                    <h1 className='font-bold'>{moveNote.turn}.</h1>
                    <h1>{moveNote.turnMoves}</h1>
                  </div>
                  <h1>{moveNote.note}</h1>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Chessboard opening={selectedOpening} />
            <button
              onClick={() => {}}
              className='w-full mt-2 py-2 rounded bg-brand-primary'
            >
              Save Note
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export const useAddNoteModal = () => {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)

  const AddNoteModalCallback = useCallback(
    () => (
      <AddNoteModal
        showModal={showAddNoteModal}
        setShowModal={setShowAddNoteModal}
      />
    ),
    [showAddNoteModal, setShowAddNoteModal]
  )

  return useMemo(
    () => ({
      showAddNoteModal,
      setShowAddNoteModal,
      AddNoteModal: AddNoteModalCallback,
    }),
    [AddNoteModalCallback, setShowAddNoteModal]
  )
}

const labelClassname = 'text-xs text-zinc-300'

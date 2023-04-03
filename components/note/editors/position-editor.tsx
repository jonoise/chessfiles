import { FC, useCallback, useMemo, useRef, useState } from 'react'
import { Modal, UseModalProps } from '@/components/shared/modal'
import dynamic from 'next/dynamic'
import { PositionI } from '@/types/notes'
import { useNoteStore } from '@/stores/use-note'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast'

const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false })

export const PositionEditor: FC<UseModalProps & { position?: PositionI }> = ({
  showModal,
  setShowModal,
  position,
}) => {
  const useNote = useNoteStore((s) => s)
  const [fen, setFen] = useState(position?.fen || '')
  const [note, setNote] = useState(position?.note)
  const boardParent = useRef<HTMLDivElement>(null)

  const addPosition = () => {
    if (position) {
      useNote.updateBodyElement(position.key, {
        ...position,
        fen,
        note,
      })
      toast.success('Position updated')
    } else {
      useNote.addToBody({
        key: nanoid(),
        type: 'position',
        fen,
        note,
      })
      setShowModal(false)
      toast.success('Position added')
    }
  }

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className='w-1/3'>
          <h1 className='text-2xl font-black'>Add Position</h1>
          <div className=''>
            <input
              type='text'
              id='fen-input'
              name='fen'
              onChange={(e) => {
                setFen(e.target.value)
              }}
              defaultValue={fen}
              placeholder='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
              className='w-full border border-zinc-300 p-2'
            />
          </div>

          <div ref={boardParent}>
            <Chessboard
              orientation={useNote.note.playingAs.value as any}
              lightSquareStyle={{ backgroundColor: '#f0f0f0' }}
              darkSquareStyle={{ backgroundColor: '#60a5fa' }}
              position={fen}
              calcWidth={() => boardParent.current?.clientWidth || 0}
            />
          </div>
          <textarea
            name='note'
            className='w-full p-1'
            placeholder='Position note'
            id='position-note'
            onChange={(e) => setNote(e.target.value)}
            defaultValue={note}
          ></textarea>
          <div className='mt-5 w-full flex justify-center items-center'>
            <button
              onClick={addPosition}
              className=' bg-white border border-zinc-300 w-full py-2 font-semibold'
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const usePositionEditor = () => {
  const [showPositionEditor, setShowPositionEditor] = useState(false)

  const PositionEditorCallback = useCallback(
    (props: { position?: PositionI }) => (
      <PositionEditor
        {...props}
        showModal={showPositionEditor}
        setShowModal={setShowPositionEditor}
      />
    ),
    [showPositionEditor, setShowPositionEditor]
  )

  return useMemo(
    () => ({
      showPositionEditor,
      setShowPositionEditor,
      PositionEditor: PositionEditorCallback,
    }),
    [PositionEditorCallback, setShowPositionEditor]
  )
}

import { FC, useCallback, useMemo, useState } from 'react'
import { Modal, UseModalProps } from '@/components/shared/modal'
import { Note } from '@/types/notes'
import { clientDeleteNote } from '@/lib/services/client/note'
import { mutate } from 'swr'

export const DeleteNoteModal: FC<UseModalProps & { note: Note }> = ({
  showModal,
  setShowModal,
  note,
}) => {
  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div>
          <div className='flex flex-col rounded-md bg-slate-100 w-96 p-4 text-zinc-800'>
            <h1 className='text-xl font-bold'>Delete Note</h1>
            <p>
              This is a note for{' '}
              {note.title ? 'the ' + note.title : 'an unknown opening'}. You
              want to delete it?{' '}
            </p>
            <div className='flex space-x-2'>
              <button
                onClick={() => setShowModal(false)}
                className='w-full py-2 mt-4 bg-blue-500 text-zinc-100 rounded-md'
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await clientDeleteNote(note.key)
                  setShowModal(false)
                  mutate('/api/notes')
                }}
                className='w-full py-2 mt-4 bg-red-500 text-zinc-100 rounded-md'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const useDeleteNoteModal = () => {
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false)

  const DeleteNoteModalCallback = useCallback(
    (props: { note: Note }) => (
      <DeleteNoteModal
        note={props.note}
        showModal={showDeleteNoteModal}
        setShowModal={setShowDeleteNoteModal}
      />
    ),
    [showDeleteNoteModal, setShowDeleteNoteModal]
  )

  return useMemo(
    () => ({
      showDeleteNoteModal,
      setShowDeleteNoteModal,
      DeleteNoteModal: DeleteNoteModalCallback,
    }),
    [DeleteNoteModalCallback, setShowDeleteNoteModal]
  )
}

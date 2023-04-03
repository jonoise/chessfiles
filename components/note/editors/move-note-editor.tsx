import { FC, useCallback, useMemo, useState } from 'react'
import { Modal, UseModalProps } from '@/components/shared/modal'

export const MoveNoteEditor: FC<UseModalProps> = ({
  showModal,
  setShowModal,
}) => {
  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div>
          <div className='flex flex-col rounded-t bg-slate-200 w-96 px-4 py-2 text-zinc-800'></div>
        </div>
      </Modal>
    </div>
  )
}

export const useMoveNoteEditor = () => {
  const [showMoveNoteEditor, setShowMoveNoteEditor] = useState(false)

  const MoveNoteEditorCallback = useCallback(
    () => (
      <MoveNoteEditor
        showModal={showMoveNoteEditor}
        setShowModal={setShowMoveNoteEditor}
      />
    ),
    [showMoveNoteEditor, setShowMoveNoteEditor]
  )

  return useMemo(
    () => ({
      showMoveNoteEditor,
      setShowMoveNoteEditor,
      MoveNoteEditor: MoveNoteEditorCallback,
    }),
    [MoveNoteEditorCallback, setShowMoveNoteEditor]
  )
}

import React, { FC, PropsWithChildren } from 'react'
import { TextIcon, RowsIcon, DiscIcon } from '@radix-ui/react-icons'
import Tooltip from '@/components/shared/tooltip'
import { ChessboardIcon } from '@/components/icons/chessboard-icon'
import { usePositionEditor } from '../../note/editors/position-editor'
import { useTextEditor } from '@/components/note/editors/text-editor'
import { useMoveNoteEditor } from '@/components/note/editors/move-note-editor'

import { SaveButton } from './sidebar-save-button'

export const AddNoteLayout: FC<PropsWithChildren> = (props) => {
  const { TextEditor, setShowTextEditor } = useTextEditor()

  const { PositionEditor, setShowPositionEditor } = usePositionEditor()

  const { MoveNoteEditor, setShowMoveNoteEditor } = useMoveNoteEditor()

  return (
    <>
      <TextEditor />
      <PositionEditor />
      <MoveNoteEditor />
      <div className='relative'>
        <div className='absolute top-0 left-0 w-14 h-screen flex flex-col items-center justify-between bg-zinc-100 py-2 space-y-4 text-zinc-900 z-20'>
          <div className=' flex flex-col items-center space-y-4'>
            <p className='text-xs'>add</p>
            <Tooltip side='right' content='Add Text'>
              <button
                onClick={() => setShowTextEditor(true)}
                className=' text-zinc-900'
              >
                <TextIcon />
              </button>
            </Tooltip>
            <Tooltip side='right' content='Add Position'>
              <button onClick={() => setShowPositionEditor(true)}>
                <ChessboardIcon fill='#444' />
              </button>
            </Tooltip>
            {/* <Tooltip side='right' content='Add Move Note'>
              <button
                onClick={() => setShowMoveNoteEditor(true)}
                className=' text-zinc-900'
              >
                <RowsIcon />
              </button>
            </Tooltip> */}

            <SaveButton />
          </div>
        </div>
        <div className='relative h-screen overflow-y-auto px-96 py-10'>
          {props.children}
        </div>
      </div>
    </>
  )
}

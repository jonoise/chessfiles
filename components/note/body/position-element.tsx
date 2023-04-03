import { useNoteStore } from '@/stores/use-note'
import { ElementProps } from '@/types/elements'
import { PositionI } from '@/types/notes'
import dynamic from 'next/dynamic'
import React, { FC } from 'react'
import { usePositionEditor } from '../editors/position-editor'
const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false })

export const PositionElement: FC<ElementProps<PositionI>> = ({ element }) => {
  const useNote = useNoteStore((s) => s)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { PositionEditor, setShowPositionEditor } = usePositionEditor()

  return (
    <>
      <PositionEditor position={element} />
      <div onClick={() => setShowPositionEditor(true)} className='group w-full'>
        <p className='px-2 w-fit rounded-t bg-blue-500 text-white text-xs'>
          Position
        </p>
        <div
          ref={containerRef}
          className='space-y-2 border border-blue-500 rounded-r rounded-bl p-4 group-hover:bg-blue-100'
        >
          <Chessboard
            orientation={useNote.note.playingAs.value as any}
            lightSquareStyle={{ backgroundColor: '#f0f0f0' }}
            darkSquareStyle={{ backgroundColor: '#60a5fa' }}
            position={element.fen}
            calcWidth={() => {
              if (containerRef.current) {
                return containerRef.current.offsetWidth - 32
              }
              return 0
            }}
          />

          {element.note && <p>{element.note}</p>}
        </div>
      </div>
    </>
  )
}

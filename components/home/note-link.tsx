import { Note } from '@/types/notes'
import dynamic from 'next/dynamic'
import React, { FC, PropsWithChildren } from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { GiCrossedSwords, GiReturnArrow } from 'react-icons/gi'
import { useDeleteNoteModal } from './delete-note-modal'
import Link from 'next/link'
import dayjs from 'dayjs'
const Chessboard = dynamic(() => import('chessboardjsx'), {
  ssr: false,
})
export const NoteLink: FC<{ note: Note }> = ({ note }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { DeleteNoteModal, setShowDeleteNoteModal } = useDeleteNoteModal()
  console.log(note)
  return (
    <div
      ref={ref}
      key={note.key}
      className='flex flex-col items-center justify-center border pt-4 pb-2 rounded-md'
    >
      <DeleteNoteModal note={note} />
      <Link href={`/note/${note.key}`}>
        <Chessboard
          lightSquareStyle={{ backgroundColor: '#f0f0f0' }}
          darkSquareStyle={{ backgroundColor: '#60a5fa' }}
          boardStyle={{ cursor: 'pointer' }}
          draggable={false}
          position={note.opening.fen}
          calcWidth={() => {
            if (ref.current) {
              return ref.current.offsetWidth - 35
            }
            return 0
          }}
        />
      </Link>
      <div className='px-4 mt-2 w-full flex flex-col justify-between h-full'>
        <Link href={`/note/${note.key}`}>
          <div>
            <div
              className={clsx(
                'font-semibold text-zinc-700',
                note.title.length > 30 ? 'text-xs' : 'text-sm'
              )}
            >
              {note.title ? note.title : 'Untitled'}
            </div>
            <InfoDiv>
              <GiReturnArrow className='w-2 h-2' />
              <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
                {note.variation ? note.variation : 'Unknown Variation'}
              </p>
            </InfoDiv>
            <InfoDiv>
              <GiCrossedSwords fontSize={'9px'} />
              <div className='text-xs text-zinc-600'>
                {note.opponent ? note.opponent : 'Unknown opponent'}
              </div>
            </InfoDiv>
          </div>
        </Link>

        <div className='w-full flex text-[9px] justify-between items-center text-zinc-500 mt-2'>
          <p>{dayjs(note.createdAt).format('MMMM D, YYYY')}</p>
          <div
            onClick={() => setShowDeleteNoteModal(true)}
            className='flex justify-center items-center h-6 w-6 rounded-full group hover:bg-rose-100 transform ease-in duration-150 cursor-pointer'
          >
            <TrashIcon className='group-hover:text-red-500' />
          </div>
        </div>
      </div>
    </div>
  )
}

const actionClass =
  'border rounded-full w-6 h-6 flex items-center justify-center text-zinc-400'

const InfoDiv: FC<PropsWithChildren> = (props) => {
  return (
    <div className='text-xs text-zinc-600 flex space-x-1 items-center'>
      {props.children}
    </div>
  )
}

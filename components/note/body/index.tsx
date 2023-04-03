import { NoteBodyI } from '@/types/notes'
import React, { FC } from 'react'
import { ElementWrapper } from './element-wapper'

interface Props {
  body: NoteBodyI
}

export const NoteBody: FC<Props> = ({ body }) => {
  return (
    <div className='w-full flex flex-col items-center py-10 space-y-5'>
      {body.map((element) => {
        return <ElementWrapper key={element.key} element={element} />
      })}
    </div>
  )
}

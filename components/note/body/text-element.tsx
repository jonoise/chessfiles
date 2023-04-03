import { ElementProps } from '@/types/elements'
import { Text } from '@/types/notes'
import clsx from 'clsx'
import React, { FC } from 'react'
import { useTextEditor } from '../editors/text-editor'

export const TextElement: FC<ElementProps<Text>> = ({ element, isEditing }) => {
  const { TextEditor, setShowTextEditor } = useTextEditor()
  return (
    <>
      <TextEditor text={element} />
      <div className='prose w-full'>
        <div
          className={clsx(
            'w-full p-2',
            isEditing ? 'hover:bg-blue-100  cursor-pointer' : ''
          )}
          onClick={() => setShowTextEditor(true)}
          dangerouslySetInnerHTML={{ __html: element.content }}
        />
      </div>
    </>
  )
}

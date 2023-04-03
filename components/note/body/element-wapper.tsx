import { PositionI, NoteBodyElement, Text } from '@/types/notes'
import React, { FC, useMemo } from 'react'
import { PositionElement } from './position-element'
import { TextElement } from './text-element'

interface Props {
  element: NoteBodyElement
}

export const ElementWrapper: FC<Props> = ({ element }) => {
  const ELEMENT_COMPONENT = useMemo(() => {
    if (element.type === 'text') {
      return <TextElement isEditing={true} element={element as Text} />
    }
    if (element.type === 'position') {
      return <PositionElement isEditing={true} element={element as PositionI} />
    }
    if (element.type === 'moveNote') {
      return <div></div>
    }
    return <></>
  }, [element])

  return ELEMENT_COMPONENT
}

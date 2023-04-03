import { Opening } from './opening'

export const initNote = {
  key: '',
  title: '',
  content: '',
  variation: '',
  url: '',
  opponent: '',
  playingAs: {
    value: 'white',
    label: 'White',
  },
  opening: {
    name: '',
    eco: '',
    fen: '',
    moves: '',
    label: '',
    value: '',
  },
  body: [],
  tags: [],
}

export interface DetaObject {
  key: string
}

export type NoteBodyI = Array<MoveNote | Text | PositionI>

export interface Note extends DetaObject {
  body: NoteBodyI
  opening: Opening
  variation: string
  opponent: string
  title: string
  tags: Array<string>
  url: string
  createdAt?: string
  updatedAt?: string
  playingAs: {
    value: string
    label: string
  }
}

export interface NoteBodyElement extends DetaObject {
  type: string
}

export interface MoveNote extends NoteBodyElement {
  turn: string
  turnMoves: string
  note: string
}

export interface Text extends NoteBodyElement {
  content: string
}
export interface PositionI extends NoteBodyElement {
  fen: string
  note: string
}

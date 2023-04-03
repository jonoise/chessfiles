import Select from 'react-select'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import { openings } from '@/data/openings'
import { Opening } from '@/types/opening'
import { useNoteStore } from '@/stores/use-note'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const NoteForm = () => {
  const useNote = useNoteStore((s) => s)
  const [randomOpening, setRandomOpening] = useState('')

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * openings.length)
    setRandomOpening(openings[randomIndex].name)
  }, [])

  const changeOnSelect = async (opening: Opening) => {
    useNote.setOpening(opening)
    useNote.handleInput({
      target: {
        name: 'title',
        value: opening.name,
      },
    } as any)
  }

  const channgePlayingAs = async (option: {
    value: string
    label: string
  }) => {}

  return (
    <div className='space-y-2'>
      <div className='min-h-[5rem] h-full flex items-center mb-4'>
        <div className='flex flex-col '>
          {!useNote.note.title && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={clsx(
                'font-bold',
                useNote.note.title.length > 30 ? 'text-4xl' : 'text-5xl'
              )}
            >
              Select an Opening
            </motion.p>
          )}
          {useNote.note.title && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={clsx(
                'font-bold',
                useNote.note.title.length > 30 ? 'text-4xl' : 'text-5xl'
              )}
            >
              {useNote.note.title}
            </motion.p>
          )}
          {useNote.note.variation && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='pl-1 text-sm text-zinc-600'
            >
              {useNote.note.variation}
            </motion.p>
          )}
          {useNote.note.url && (
            <motion.a
              href={useNote.note.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='pl-1 text-xs text-blue-500'
            >
              {useNote.note.url}
            </motion.a>
          )}
        </div>
      </div>
      <InputWrapper label='Opening'>
        <Select
          onChange={(opening) => {
            changeOnSelect(opening as Opening)
          }}
          placeholder={randomOpening}
          options={openings}
          className='text-black'
          value={useNote.note.opening.fen ? useNote.note.opening : null}
        />
      </InputWrapper>
      <InputWrapper label='Variation'>
        <input
          type='text'
          placeholder='Advanced Variation'
          className={inputClassname}
          defaultValue={useNote.note.variation}
          onChange={useNote.handleInput}
          name='variation'
        />
      </InputWrapper>
      <div className='w-full flex space-x-2'>
        <InputWrapper label='Opponent Name'>
          <input
            type='text'
            placeholder='Nikaru Hakamura'
            className={inputClassname}
            defaultValue={useNote.note.opponent}
            onChange={useNote.handleInput}
            name='opponent'
          />
        </InputWrapper>
        <InputWrapper label='Playing as'>
          <Select
            onChange={(side) => useNote.setPlayingAs(side as any)}
            options={[
              { value: 'white', label: 'White' },
              { value: 'black', label: 'Black' },
            ]}
            className='text-black w-full'
            value={useNote.note.playingAs}
          />
        </InputWrapper>
      </div>
      <InputWrapper label='Game URL'>
        <input
          type='text'
          placeholder='https://www.chess.com/game/live/73638078255'
          className={inputClassname}
          defaultValue={useNote.note.url}
          onChange={useNote.handleInput}
          name='url'
        />
      </InputWrapper>
    </div>
  )
}

export default NoteForm

const inputClassname = 'w-full px-3 py-2 rounded border border-[#d0d0d0]'

const InputWrapper: FC<PropsWithChildren & { label?: string }> = (props) => {
  return (
    <div className='w-full'>
      <p className='text-[10px]'>{props.label}</p>
      {props.children}
    </div>
  )
}

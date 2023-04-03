import { FC, useCallback, useMemo, useState } from 'react'
import { Modal, UseModalProps } from '@/components/shared/modal'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useNoteStore } from '@/stores/use-note'
import { Text } from '@/types/notes'
import { toast } from 'react-hot-toast'
import { nanoid } from 'nanoid'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export const TextEditor: FC<UseModalProps & { text?: Text }> = ({
  showModal,
  setShowModal,
  text,
}) => {
  const useNote = useNoteStore((s) => s)

  const [textContent, setText] = useState(text?.content || '')

  const addText = () => {
    if (text) {
      useNote.updateBodyElement(text.key, {
        ...text,
        content: textContent,
      })
      toast.success('Text updated')
    } else {
      useNote.addToBody({
        key: nanoid(),
        type: 'text',
        content: textContent,
      })
      setShowModal(false)
      toast.success('Text added')
    }
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className='w-1/3'>
        <h1 className='text-2xl font-black'>Add text</h1>
        <div className='bg-white h-72'>
          <ReactQuill
            value={textContent}
            onChange={(content) => setText(content)}
            className='h-60'
          />
        </div>
        <div className='mt-5 w-full flex justify-center items-center'>
          <button
            onClick={addText}
            className=' bg-white border border-zinc-300 w-full py-2 font-semibold'
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  )
}

export const useTextEditor = () => {
  const [showTextEditor, setShowTextEditor] = useState(false)

  const TextEditorCallback = useCallback(
    (props: { text?: Text }) => (
      <TextEditor
        text={props.text}
        showModal={showTextEditor}
        setShowModal={setShowTextEditor}
      />
    ),
    [showTextEditor, setShowTextEditor]
  )

  return useMemo(
    () => ({
      showTextEditor,
      setShowTextEditor,
      TextEditor: TextEditorCallback,
    }),
    [TextEditorCallback, setShowTextEditor]
  )
}

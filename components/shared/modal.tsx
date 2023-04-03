import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'

interface ModalProps {
  children: React.ReactNode
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  closeWithX?: boolean
}

export interface UseModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  closeWithX?: boolean
}

export function Modal({
  children,
  showModal,
  setShowModal,
  closeWithX,
}: ModalProps) {
  const router = useRouter()
  const { key } = router.query
  const desktopModalRef = useRef(null)

  const closeModal = useCallback(
    (closeWithX?: boolean) => {
      if (closeWithX) {
        return
      } else {
        setShowModal(false)
      }
    },
    [key, router, setShowModal]
  )

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && e.altKey && !closeWithX) {
      setShowModal(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  const controls = useAnimation()
  const transitionProps = { type: 'spring', stiffness: 500, damping: 30 }
  useEffect(() => {
    controls.start({
      y: 0,
      transition: transitionProps,
    })
  }, [])

  return (
    <AnimatePresence>
      {showModal && (
        <div className='absolute'>
          <motion.div
            ref={desktopModalRef}
            key='desktop-modal'
            className='fixed inset-0 z-40 flex flex-col min-h-screen items-center justify-center'
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onMouseDown={(e) => {
              if (desktopModalRef.current === e.target) {
                closeModal(closeWithX)
              }
            }}
          >
            {children}
          </motion.div>
          <motion.div
            key='backdrop'
            className='fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeModal(closeWithX)}
          />
        </div>
      )}
    </AnimatePresence>
  )
}

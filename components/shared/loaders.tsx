import { motion } from 'framer-motion'
export const NoteLoader = () => {
  return (
    <motion.div
      key={'load-note'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.4, delay: 1 } }}
      className='top-0 left-0 absolute w-full h-screen flex items-center justify-center'
    >
      <p>Loading your note.</p>
    </motion.div>
  )
}

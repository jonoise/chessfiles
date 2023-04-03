import React, { FC } from 'react'
import { useWindowSize } from 'react-use'
import { Opening } from '@/types/opening'
import dynamic from 'next/dynamic'

const ChessboardJSX = dynamic(() => import('chessboardjsx'), {
  ssr: false,
})
export const Chessboard: FC<{ opening: Opening | null }> = ({ opening }) => {
  const { width } = useWindowSize()

  return (
    <div className='relative mt-2 md:mt-0'>
      <ChessboardJSX
        orientation='black'
        width={width >= 1280 ? width / 3 : width - 45}
        draggable={false}
        position={opening ? opening.fen : 'start'}
      />
    </div>
  )
}

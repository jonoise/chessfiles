import React, { FC } from 'react'

export const ChessboardIcon: FC<{ fill?: string }> = ({ fill }) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#chessboard-icon)'>
        <rect width='3.20015' height='3.20015' fill={fill || '#000000'} />
        <rect
          y='6.42969'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          y='12.7969'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='3.1875'
          y='3.1875'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='3.1875'
          y='9.57031'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='6.42969'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='6.42969'
          y='6.42969'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='6.42969'
          y='12.7969'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='9.57031'
          y='3.1875'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='9.57031'
          y='9.57031'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='12.7969'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='12.7969'
          y='6.42969'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
        <rect
          x='12.7969'
          y='12.7969'
          width='3.20015'
          height='3.20015'
          fill={fill || '#000000'}
        />
      </g>
      <defs>
        <clipPath id='chessboard-icon'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

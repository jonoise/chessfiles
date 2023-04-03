import React from 'react'
import s from './logo.module.css'

export const ChessifyLogo = () => {
  return (
    <button className={s.button}>
      <span className={s.text}>Chessify</span>
      <span className={s.blob}></span>
      <span className={s.blob}></span>
      <span className={s.blob}></span>
      <span className={s.blob}></span>
    </button>
  )
}

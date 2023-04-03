import React from 'react'
import s from './logo.module.css'

export const ChessfilesLogo = () => {
  return (
    <button className={s.button}>
      <span className={s.text}>Chessfiles</span>
      <span className={s.blob}></span>
      <span className={s.blob}></span>
      <span className={s.blob}></span>
      <span className={s.blob}></span>
    </button>
  )
}

import React from 'react'
import styles from '@css/extras/close.module.css'

function Close({onClick}) {
  return (
    <button className={styles.close} onClick={() => onClick(false)} >close</button>
  )
}

export default Close
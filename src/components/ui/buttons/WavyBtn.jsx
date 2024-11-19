import React from 'react'
import stytes from '@css/buttons/wavybtn.module.css'

function WavyBtn({ children }) {
  const handleclick = () => {
    alert("Link-Copied to clipboard")
  }
  return (
    <a className={stytes.codepenButton} onClick={handleclick} ><span>{children}</span></a>
  )
}

export default WavyBtn
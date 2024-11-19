import React from 'react'
import styles from '@css/helpers/minwrapper.module.css'
import { cn } from "@/lib/utils"


function MaxWrapper({ children, className }) {
  return (
    <div className={cn(` ${styles.allbox} p-4 rounded-md  `, className)}>
      {children}
    </div>
  )
}
export default MaxWrapper

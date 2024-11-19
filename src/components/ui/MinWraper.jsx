import React from 'react'
import styles from '@css/helpers/minwrapper.module.css'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

function MinWrapper({ children, className }) {
  return (
    <span className={cn(` ${styles.minwrapper} rounded-md`,className)}>
      {children}
    </span>
  )
}
export default MinWrapper

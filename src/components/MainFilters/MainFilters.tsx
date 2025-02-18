import createClasses from '@/utils/createClasses'
import styles from './style.module.scss'
import React from 'react'

interface Props {
  type: 'Pet' | 'Toy'
  className?: string
  firstFilterRef?: React.RefObject<HTMLButtonElement | null>
}

export default function MainFilters({
  type,
  className,
  firstFilterRef
}: Props) {
  return (
    <div className={createClasses({
      [styles['filters']]: true,
      ...(className ? { [className]: true } : {})
    })}>
      <button ref={firstFilterRef}>button</button>
      filter content
    </div>
  )
}

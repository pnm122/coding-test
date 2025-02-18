'use client'

import createClasses from '@/utils/createClasses'
import styles from './style.module.scss'
import React from 'react'
import { Accordion } from '@szhsin/react-accordion'
import FilterAccordionItem from '../FilterAccordionItem/FilterAccordionItem'

interface Props {
  type: 'Pet' | 'Toy'
  className?: string
  firstFilterRef?: React.RefObject<HTMLDivElement | null>
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
      <Accordion transition={true} allowMultiple>
        <FilterAccordionItem ref={firstFilterRef} header='test'>
          content
        </FilterAccordionItem>
      </Accordion>
    </div>
  )
}

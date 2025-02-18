'use client'

import { useRef, useState } from 'react'
import FilterSearch from '../FilterSearch/FilterSearch'
import MainFilters from '../MainFilters/MainFilters'
import styles from './style.module.scss'
import FluentFilter16Filled from '~icons/fluent/filter-16-filled'
import FluentCaretDown16Filled from '~icons/fluent/caret-down-16-filled'
import Dropdown from '../Dropdown/Dropdown'
import { ValidSearchParams } from '@/utils/searchParams'

interface Props<T extends 'Pet' | 'Toy'> {
  type: T
  searchParams: ValidSearchParams<T>
  attributesFilter: React.ReactNode
}

export default function Filters<T extends 'Pet' | 'Toy'>({
  type,
  searchParams,
  attributesFilter
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const firstFilterRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className={styles['filters']}>
      <FilterSearch />
      <MainFilters searchParams={searchParams} type={type} className={styles['desktop-filters']} attributesFilter={attributesFilter} />
      <div className={styles['mobile-filters']}>
        <button
          aria-controls='filters-dropdown'
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={styles['filters-toggle']}
          ref={toggleButtonRef}
        >
          <div className={styles['filters-toggle__main']}>
            <FluentFilter16Filled />
            <span>Filters</span>
          </div>
          <FluentCaretDown16Filled className={styles['caret']} />
        </button>
        <Dropdown
          id='filters-dropdown'
          className={styles['filters-dropdown']}
          open={open}
          onClose={() => setOpen(false)}
          focusOnOpenRef={firstFilterRef}
          toggleButton={toggleButtonRef}
        >
          <MainFilters searchParams={searchParams} firstFilterRef={firstFilterRef} type={type} attributesFilter={attributesFilter} />
        </Dropdown>
      </div>
    </div>
  )
}

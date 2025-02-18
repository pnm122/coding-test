'use client'

import createClasses from '@/utils/createClasses'
import styles from './style.module.scss'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Accordion } from '@szhsin/react-accordion'
import FilterAccordionItem from '../FilterAccordionItem/FilterAccordionItem'
import Checkbox from '../Checkbox/Checkbox'
import { newParamsURL, SEARCH_PARAM_COLOR, SEARCH_PARAM_TYPE, ValidSearchParams } from '@/utils/searchParams'
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup'
import { ColorEnum, PetTypeEnum, ToyTypeEnum } from '@prisma/client'
import Pill from '../Pill/Pill'

interface Props<T extends 'Pet' | 'Toy'> {
  type: T
  className?: string
  firstFilterRef?: React.RefObject<HTMLDivElement | null>
  searchParams: ValidSearchParams<T>
}

export default function MainFilters<T extends 'Pet' | 'Toy'>({
  type,
  className,
  firstFilterRef,
  searchParams
}: Props<T>) {
  const allSearchParams = useSearchParams()
  const router = useRouter()

  function onUpdateValue(
    key: string,
    value: string,
    // Whether to set this value (true) or remove it (false)
    isSet: boolean
  ) {
    const currentValue = allSearchParams.getAll(key)
    const newValue =
      isSet
        ? currentValue.includes(value) ? currentValue : [...currentValue, value]
        : currentValue.includes(value) ? currentValue.filter(v => v !== value) : currentValue

    router.push(
      newParamsURL(
        allSearchParams,
        { [key]: newValue }
      )
    )
  }

  return (
    <div className={createClasses({
      [styles['filters']]: true,
      ...(className ? { [className]: true } : {})
    })}>
      <Accordion transition={true} allowMultiple>
        <FilterAccordionItem ref={firstFilterRef} header='Type'>
          <CheckboxGroup>
            {type === 'Pet' ? (
              Object.values(PetTypeEnum).map(petType => (
                <Checkbox
                  key={petType}
                  checked={(searchParams[SEARCH_PARAM_TYPE] as string[]).includes(petType)}
                  onChange={(value) => onUpdateValue(SEARCH_PARAM_TYPE, petType, value)}
                >
                  {petType}
                </Checkbox>
              ))
            ) : (
              Object.values(ToyTypeEnum).map(toyType => (
                <Checkbox
                  key={toyType}
                  checked={(searchParams[SEARCH_PARAM_TYPE] as string[]).includes(toyType)}
                  onChange={(value) => onUpdateValue(SEARCH_PARAM_TYPE, toyType, value)}
                >
                  {toyType}
                </Checkbox>
              ))
            )}
          </CheckboxGroup>
        </FilterAccordionItem>
        <FilterAccordionItem ref={firstFilterRef} header='Color'>
          <CheckboxGroup>
            {Object.values(ColorEnum).map(color => (
              <Checkbox
                key={color}
                checked={(searchParams[SEARCH_PARAM_COLOR] as string[]).includes(color)}
                onChange={(value) => onUpdateValue(SEARCH_PARAM_COLOR, color, value)}
              >
                <Pill variant={color}>{color}</Pill>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </FilterAccordionItem>
      </Accordion>
    </div>
  )
}

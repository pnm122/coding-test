'use client'

import createClasses from '@/utils/createClasses'
import styles from './style.module.scss'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Accordion } from '@szhsin/react-accordion'
import FilterAccordionItem from '../FilterAccordionItem/FilterAccordionItem'
import Checkbox from '../Checkbox/Checkbox'
import { onUpdateValueArray, onUpdateValueSingle, SEARCH_PARAM_COLOR, SEARCH_PARAM_TYPE, SEARCH_PARAM_WEIGHT_MAX, SEARCH_PARAM_WEIGHT_MIN, ValidSearchParams } from '@/utils/searchParams'
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup'
import { ColorEnum, PetTypeEnum, ToyTypeEnum } from '@prisma/client'
import Pill from '../Pill/Pill'
import { useDebouncedCallback } from 'use-debounce'
import RangeSlider from '../RangeSlider/RangeSlider'

interface Props<T extends 'Pet' | 'Toy'> {
  type: T
  className?: string
  firstFilterRef?: React.RefObject<HTMLDivElement | null>
  searchParams: ValidSearchParams<T>
  attributesFilter: React.ReactNode
}

export default function MainFilters<T extends 'Pet' | 'Toy'>({
  type,
  className,
  firstFilterRef,
  searchParams,
  attributesFilter
}: Props<T>) {
  const allSearchParams = useSearchParams()
  const router = useRouter()
  const [weightRange, setWeightRange] = useState([
    searchParams[SEARCH_PARAM_WEIGHT_MIN],
    searchParams[SEARCH_PARAM_WEIGHT_MAX]
  ])

  function onRangeSliderInput(values: number[]) {
    setWeightRange(values)
    updateWeightRangeParams(values)
  }

  const updateWeightRangeParams = useDebouncedCallback(
    ([min, max]: number[]) => {
      if(min !== searchParams[SEARCH_PARAM_WEIGHT_MIN]) {
        onUpdateValueSingle(
          SEARCH_PARAM_WEIGHT_MIN,
          min.toString(),
          allSearchParams,
          router
        )
      } else if(max !== searchParams[SEARCH_PARAM_WEIGHT_MAX]) {
        onUpdateValueSingle(
          SEARCH_PARAM_WEIGHT_MAX,
          max.toString(),
          allSearchParams,
          router
        )
      }
    },
    500
  )

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
                  onChange={(value) => onUpdateValueArray(SEARCH_PARAM_TYPE, petType, value, allSearchParams, router)}
                >
                  {petType}
                </Checkbox>
              ))
            ) : (
              Object.values(ToyTypeEnum).map(toyType => (
                <Checkbox
                  key={toyType}
                  checked={(searchParams[SEARCH_PARAM_TYPE] as string[]).includes(toyType)}
                  onChange={(value) => onUpdateValueArray(SEARCH_PARAM_TYPE, toyType, value, allSearchParams, router)}
                >
                  {toyType}
                </Checkbox>
              ))
            )}
          </CheckboxGroup>
        </FilterAccordionItem>
        <FilterAccordionItem header='Color'>
          <CheckboxGroup>
            {Object.values(ColorEnum).map(color => (
              <Checkbox
                key={color}
                checked={(searchParams[SEARCH_PARAM_COLOR] as string[]).includes(color)}
                onChange={(value) => onUpdateValueArray(SEARCH_PARAM_COLOR, color, value, allSearchParams, router)}
              >
                <Pill variant={color}>{color}</Pill>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </FilterAccordionItem>
        <FilterAccordionItem header='Weight'>
          <div style={{ paddingInline: 8 }}>
            <RangeSlider
              values={[weightRange[0], weightRange[1]]}
              min={0}
              max={100}
              onChange={onRangeSliderInput}
              units='lbs.'
            />
          </div>
        </FilterAccordionItem>
        {type === 'Pet' && (
          // Not the greatest UX but keying this to the type makes sure we don't get a state where the checkboxes don't fit in the content box properly
          <FilterAccordionItem header='Attributes' key={JSON.stringify(searchParams[SEARCH_PARAM_TYPE])}>
            {attributesFilter}
          </FilterAccordionItem>
        )}
      </Accordion>
    </div>
  )
}

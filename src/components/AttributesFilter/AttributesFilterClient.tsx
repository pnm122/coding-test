'use client'

import CheckboxGroup from '../CheckboxGroup/CheckboxGroup'
import Checkbox from '../Checkbox/Checkbox'
import { onUpdateValueArray, SEARCH_PARAM_ATTRIBUTE, ValidSearchParams } from '@/utils/searchParams'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  attributes: string[]
  searchParams: ValidSearchParams<'Pet'>
}

export default function AttributesFilterClient({
  attributes,
  searchParams
}: Props) {
  const allSearchParams = useSearchParams()
  const router = useRouter()

  return (
    <CheckboxGroup>
      {attributes.map(attr => (
        <Checkbox
          key={attr}
          checked={(searchParams[SEARCH_PARAM_ATTRIBUTE] as string[]).includes(attr)}
          onChange={(value) => onUpdateValueArray(SEARCH_PARAM_ATTRIBUTE, attr, value, allSearchParams, router)}
        >
          {attr}
        </Checkbox>
      ))}
    </CheckboxGroup>
  )
}

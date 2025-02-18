import { SEARCH_PARAM_TYPE, ValidSearchParams } from '@/utils/searchParams'
import { getValidAttributes } from '@/utils/database/attribute'

import AttributesFilterClient from './AttributesFilterClient'

interface Props {
  searchParams: ValidSearchParams<'Pet'>
}

export default async function AttributesFilter({
  searchParams,
}: Props) {
  const attributes = await getValidAttributes(searchParams[SEARCH_PARAM_TYPE])

  return <AttributesFilterClient attributes={attributes} searchParams={searchParams} />
}

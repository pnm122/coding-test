import AttributesFilter from '@/components/AttributesFilter/AttributesFilter'
import Filters from '@/components/Filters/Filters'
import ProductsPage from '@/components/ProductsPage/ProductsPage'
import { validateSearchParams } from '@/utils/searchParams'
import React from 'react'

export default async function Pets({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const res = await searchParams
  const validParams = validateSearchParams(res, 'Pet')
  const attributesFilter = <AttributesFilter searchParams={validParams} />

  return (
    <ProductsPage>
      <Filters type='Pet' searchParams={validParams} attributesFilter={attributesFilter} />
    </ProductsPage>
  )
}

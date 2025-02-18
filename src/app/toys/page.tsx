import Filters from '@/components/Filters/Filters'
import ProductsList from '@/components/ProductsList/ProductsList'
import ProductsPage from '@/components/ProductsPage/ProductsPage'
import { validateSearchParams } from '@/utils/searchParams'
import React from 'react'

export default async function Toys({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const res = await searchParams
  const validParams = validateSearchParams(res, 'Toy')

  return (
    <ProductsPage>
      <Filters type='Toy' searchParams={validParams} />
      <ProductsList type='Toy' searchParams={validParams} />
    </ProductsPage>
  )
}

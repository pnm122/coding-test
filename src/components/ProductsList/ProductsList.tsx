import { getPets } from '@/utils/database/animal'
import styles from './style.module.scss'
import { ValidSearchParams } from '@/utils/searchParams'
import Product from '../Product/Product'

interface Props<T extends 'Pet' | 'Toy'> {
  type: T,
  searchParams: ValidSearchParams<T>
}

export default async function ProductsList<T extends 'Pet' | 'Toy'>({
  type,
  searchParams
}: Props<T>) {
  const res = type === 'Pet' ? await getPets(searchParams as ValidSearchParams<'Pet'>) : []

  return (
    <div className={styles['product-list']}>
      {res.map(pet => (
        <Product key={pet.id} product={pet} />
      ))}
    </div>
  )
}

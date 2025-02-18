import { getPets } from '@/utils/database/pet'
import styles from './style.module.scss'
import { ValidSearchParams } from '@/utils/searchParams'

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
    <div>
      {res.map(pet => (
        <div key={pet.id}>{pet.animal.name} * {pet.animal.weight} lbs. * {pet.animal.colors.map(({ color }) => color.color).join(', ')} * Sold?: {pet.animal.sale?.price}</div>
      ))}
    </div>
  )
}

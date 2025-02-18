import styles from './style.module.scss'
import FluentAnimalCat16Filled from '~icons/fluent/animal-cat-16-filled'

export default function Logo() {
  return (
    <div className={styles['logo']}>
      <FluentAnimalCat16Filled />
      <p>
        Pet
        <b>Shop</b>
      </p>
    </div>
  )
}

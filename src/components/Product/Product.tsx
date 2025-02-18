import { getAnimalsSelect } from "@/utils/database/animal"
import { Prisma } from "@prisma/client"
import styles from './style.module.scss'
import createClasses from "@/utils/createClasses"
import FluentCheckmark16Filled from '~icons/fluent/checkmark-16-filled'

type Props = {
  product: Prisma.AnimalGetPayload<typeof getAnimalsSelect>
}

export default function Product({
  product
}: Props) {
  return (
    <div className={styles['product']}>
      <div className={styles['card']}>
        <span className={createClasses({
          [styles['card__type']]: true,
          [styles['card__type--pet']]: product.product === 'Pet',
          [styles['card__type--toy']]: product.product === 'Toy'
        })}>
          {product.product}
        </span>
        <div className={createClasses({
          [styles['colors']]: true,
          [styles[`colors--${product.product === 'Pet' ? product.pet?.type.name.toLowerCase() : product.toy?.type.name.toLowerCase()}`]]: true
        })}>
          {product.colors.map(c => (
            <div key={c.color.id} className={styles['colors__color']} style={{ backgroundColor: `var(--animal-${c.color.color.toLowerCase()})` }} />
          ))}
        </div>
      </div>
      <div className={styles['info']}>
        <h2 className={styles['info__name']}>{product.name}</h2>
        <h3 className={styles['info__subheading']}>
          {product.product} {product.pet?.type.name.toLowerCase()} • {product.weight.toFixed(1)} lbs.{product.product === 'Toy' ? ` • ${product.toy?.size}` : ''}
        </h3>
      </div>
      {product.product === 'Pet' && (
        <>
          <hr></hr>
          <ul className={styles['attributes']}>
            {product.pet?.attributes.map(({ attribute: { id, attribute } }) => (
              <li key={id} className={styles['attributes__attribute']}>
                <FluentCheckmark16Filled />
                {attribute}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

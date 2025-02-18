import styles from './style.module.scss'

export default function ProductsPage({
  children
}: React.PropsWithChildren) {
  return (
    <main className={styles['page']}>
      {children}
    </main>
  )
}

import styles from './style.module.scss'

export default function CheckboxGroup({
  children
}: React.PropsWithChildren) {
  return (
    <fieldset className={styles['group']}>
      {children}
    </fieldset>
  )
}

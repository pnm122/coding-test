import Logo from '@/components/Logo/Logo'
import styles from './style.module.scss'
import HeaderLink from './HeaderLink'

export default function Header() {
  return (
    <div className={styles['header']}>
      <Logo />
      <nav className={styles['header__nav']}>
        <ul className={styles['links']}>
          <li className={styles['links__item']}>
            <HeaderLink
              href='/pets'>
                Pets
            </HeaderLink>
          </li>
          <li className={styles['links__item']}>
            <HeaderLink
              href='/toys'>
                Toys
            </HeaderLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

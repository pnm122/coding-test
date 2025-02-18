'use client'

import { usePathname } from 'next/navigation'
import styles from './style.module.scss'
import Link from 'next/link'

export default function HeaderLink({
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname()

  return (
    <Link
      className={styles['link']}
      aria-current={pathname === props.href ? 'page' : undefined}
      {...props}
    />
  )
}

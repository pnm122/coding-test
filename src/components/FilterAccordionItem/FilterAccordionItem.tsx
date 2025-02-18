import { AccordionItem } from "@szhsin/react-accordion";
import styles from './style.module.scss'
import FluentCaretRight16Filled from '~icons/fluent/caret-right-16-filled'
import createClasses from "@/utils/createClasses";

type Props = React.PropsWithChildren<{
  header: string,
  ref?: React.RefObject<HTMLDivElement | null>
}>

export default function FilterAccordionItem({
  header,
  children,
  ref
}: Props) {
  return (
    <AccordionItem
      ref={ref}
      className={styles['filter-item']}
      buttonProps={{
        className: ({ isEnter }) => createClasses({
          [styles['filter-item__button']]: true,
          [styles['filter-item__button--expanded']]: isEnter
        }),
      }}
      contentProps={{
        className: styles['content']
      }}
      header={
        <div className={styles['header']}>
          <FluentCaretRight16Filled className={styles['caret']} />
          <p className={styles['header__text']}>{header}</p>
        </div>
      }
    >
      <div className={styles['content__inner']}>
        {children}
      </div>
    </AccordionItem>
  )
}

import { PropsWithChildren } from 'react'
import styles from './style.module.scss'
import FluentCheckmark16Filled from '~icons/fluent/checkmark-16-filled'
import createClasses from '@/utils/createClasses'

type Props = PropsWithChildren<{
	checked: boolean
	onChange?: (value: boolean) => void
	disabled?: boolean
	className?: string
}>

export default function Checkbox({
	checked,
	onChange = () => {},
	disabled,
	className,
	children
}: Props) {
	return (
		<button
			className={createClasses({
				[styles['checkbox']]: true,
				...(className ? { [className]: true } : {})
			})}
			role="checkbox"
			aria-checked={checked}
			disabled={disabled}
			onClick={() => !disabled && onChange(!checked)}
		>
			<div className={styles['checkbox__box']}>
				<FluentCheckmark16Filled className={styles['check']} />
			</div>
			{children}
		</button>
	)
}

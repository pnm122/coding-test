'use client'

import createClasses from '@/utils/createClasses'
import styles from './style.module.scss'

type Props = {
	id: string
	value: string
	label?: string
	required?: boolean
	disabled?: boolean
	wrapperClassName?: string
	inputClassName?: string
	units?: string
  icon?: React.ReactNode
	ref?: React.Ref<HTMLInputElement>
} & Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'value' | 'size' | 'required' | 'disabled' | 'id' | 'className'
>

export default function Input({
	id,
	value,
	label,
	required,
	disabled,
	wrapperClassName,
	inputClassName,
	units,
  icon,
	ref,
	...inputAttributes
}: Props) {
	return (
		<div
			className={createClasses({
				[styles['input']]: true,
				...(wrapperClassName ? { [wrapperClassName]: true } : {})
			})}
		>
			{label && (
				<label htmlFor={id} className={styles['input__label']}>
					{label}
					{required && <span className={styles['input__required-star']}>*</span>}
				</label>
			)}
			<div className={styles['main-control']}>
        {icon && <div className={styles['main-control__icon']}>{icon}</div>}
				<input
					id={id}
					required={required}
					disabled={disabled}
					className={createClasses({
						[styles['main-control__input']]: true,
						...(inputClassName ? { [inputClassName]: true } : {})
					})}
					value={value}
					size={1}
					ref={ref}
					{...inputAttributes}
				/>
				{units && <span className={styles['main-control__units']}>{units}</span>}
			</div>
		</div>
	)
}

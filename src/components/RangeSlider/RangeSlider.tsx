import React from "react"
import { getTrackBackground, Range } from "react-range"
import styles from './style.module.scss'

type Props =
  Partial<React.ComponentProps<typeof Range>> &
  Pick<React.ComponentProps<typeof Range>, 'values' | 'min' | 'max' | 'onChange'> &
  { units?: string }

export default function RangeSlider(componentProps: Props) {
  function withUnits(value: number) {
    return `${value}${componentProps.units ? ` ${componentProps.units}` : ''}`
  }
  
  return (
    <div className={styles['wrapper']}>
      <Range
        {...componentProps}
        renderTrack={({ props, children }) => (
          <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "4px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: [componentProps.values[0], componentProps.values[1]],
                colors: ["var(--border)", "var(--primary-base)", "var(--border)"],
                min: 0,
                max: 100,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "40px",
              width: "40px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              style={{
                height: "16px",
                width: "16px",
                border: "2px solid var(--background)",
                borderRadius: "999px",
                backgroundColor: "var(--primary-base)",
              }}
            />
          </div>
        )}
      />
      <p className={styles['values']}>
        {componentProps.values[0]} - {withUnits(componentProps.values[1])}
      </p>
    </div>
  )
}

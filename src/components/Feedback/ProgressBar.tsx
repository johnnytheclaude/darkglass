import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ProgressBarTone = 'success' | 'accent' | 'warning' | 'danger'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Kolik je hotovo (0 až `max`). */
  value: number
  max?: number
  tone?: ProgressBarTone
  /** Popisek vlevo nad pruhem. */
  label?: ReactNode
  /** Hodnota vpravo nad pruhem („5 ze 7“); bez ní se horní řádek nekreslí. */
  valueLabel?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * ProgressBar — ukazatel průběhu známé délky. Procenta si komponenta
 * nedopočítává do textu: co se nad pruhem píše, dodává aplikace.
 */
export function ProgressBar({
  value,
  max = 100,
  tone = 'success',
  label,
  valueLabel,
  className,
  ...rest
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 1
  const ratio = Math.min(Math.max(value / safeMax, 0), 1)
  const classes = ['dg-progress', `dg-progress--${tone}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {label != null || valueLabel != null ? (
        <div className="dg-progress__top">
          <span className="dg-progress__label">{label}</span>
          <span className="dg-progress__value">{valueLabel}</span>
        </div>
      ) : null}
      <div
        className="dg-progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
      >
        <div className="dg-progress__fill" style={{ width: `${ratio * 100}%` }} />
      </div>
    </div>
  )
}

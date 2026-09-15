import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ProgressRingTone = 'accent' | 'success' | 'warning' | 'danger'

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  tone?: ProgressRingTone
  /** Hrana kroužku v px při --scale 1 (návrh 92). */
  size?: number
  /** Text uprostřed; bez něj zůstane kroužek prázdný. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * ProgressRing — průběh v kroužku. Kreslí se jako SVG, aby zůstal ostrý
 * ve všech třech velikostech UI.
 */
export function ProgressRing({
  value,
  max = 100,
  tone = 'accent',
  size = 92,
  children,
  className,
  style,
  ...rest
}: ProgressRingProps) {
  const safeMax = max > 0 ? max : 1
  const ratio = Math.min(Math.max(value / safeMax, 0), 1)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const classes = ['dg-ring', `dg-ring--${tone}`, className].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      style={{
        width: `calc(${size}px * var(--scale))`,
        height: `calc(${size}px * var(--scale))`,
        ...style,
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      {...rest}
    >
      <svg className="dg-ring__svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <circle className="dg-ring__track" cx="50" cy="50" r={radius} strokeWidth="9" fill="none" />
        <circle
          className="dg-ring__value"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference * ratio} ${circumference}`}
        />
      </svg>
      {children != null ? <span className="dg-ring__center">{children}</span> : null}
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type SegmentTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

export interface ProgressSegment {
  label: ReactNode
  value: number
  tone?: SegmentTone
  /** Co stojí v legendě místo dopočítaného podílu. */
  display?: ReactNode
}

export interface SegmentedProgressProps extends HTMLAttributes<HTMLDivElement> {
  segments: ProgressSegment[]
  /** Kolik je celek; bez něj se sečtou segmenty a pruh je plný. */
  total?: number
  /** Legenda pod pruhem; bez ní zůstane jen pruh. */
  legend?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * Vícesegmentový pruh — § Data · rozšíření. Jeden pruh rozdělený na části
 * (hotovo / probíhá / chyba) a legenda s podíly. Nedoplněný zbytek do celku
 * zůstane vidět jako prázdná dráha.
 */
export function SegmentedProgress({
  segments,
  total,
  legend = true,
  className,
  ...rest
}: SegmentedProgressProps) {
  const classes = ['dg-segmented-progress', className].filter(Boolean).join(' ')
  const sum = segments.reduce((acc, segment) => acc + Math.max(0, segment.value), 0)
  const whole = total ?? sum
  const percent = (value: number) => (whole > 0 ? (Math.max(0, value) / whole) * 100 : 0)

  return (
    <div className={classes} {...rest}>
      <div className="dg-segmented-progress__bar">
        {segments.map((segment, i) => (
          <span
            className={`dg-segmented-progress__seg dg-segmented-progress__seg--${segment.tone ?? 'accent'}`}
            key={i}
            style={{ width: `${percent(segment.value)}%` }}
          />
        ))}
      </div>
      {legend ? (
        <div className="dg-segmented-progress__legend">
          {segments.map((segment, i) => (
            <span className="dg-segmented-progress__item" key={i}>
              <span
                className={`dg-segmented-progress__swatch dg-segmented-progress__swatch--${segment.tone ?? 'accent'}`}
                aria-hidden="true"
              />
              <span className="dg-segmented-progress__label">{segment.label}</span>
              <span className="dg-segmented-progress__value">
                {segment.display ?? `${Math.round(percent(segment.value))} %`}
              </span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { ChartCard } from './ChartCard'
import type { ChartTone } from './ChartCard'

export interface StackedSegment {
  value: number
  tone?: ChartTone
  /** Co segment znamená — jde do title, aby šel přečíst i bez legendy. */
  label?: string
}

export interface StackedBarGroup {
  label: ReactNode
  segments: StackedSegment[]
}

export interface StackedBarChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  groups: StackedBarGroup[]
  /** Horní hranice; bez ní se bere největší součet skupiny. */
  max?: number
  ref?: Ref<HTMLDivElement>
}

const TONES: ChartTone[] = ['purple', 'accent', 'success', 'warning', 'danger', 'neutral']

/**
 * Chart / Bars Stacked — skládané sloupce. Každá skupina je jeden sloupec
 * složený ze segmentů; sloupce se dělí o šířku karty.
 */
export function StackedBarChart({
  title,
  subtitle,
  groups,
  max,
  className,
  ...rest
}: StackedBarChartProps) {
  const totals = groups.map((g) => g.segments.reduce((s, seg) => s + Math.max(0, seg.value), 0))
  const top = max ?? Math.max(1, ...totals)
  const classes = ['dg-bars-s', className].filter(Boolean).join(' ')

  return (
    <ChartCard className={classes} title={title} subtitle={subtitle} {...rest}>
      <div className="dg-bars-s__bars">
        {groups.map((group, gi) => (
          <div key={gi} className="dg-bars-s__col">
            <div className="dg-bars-s__stack">
              {group.segments.map((seg, si) => (
                <span
                  key={si}
                  className={`dg-bars-s__seg dg-series--${seg.tone ?? TONES[si % TONES.length]}`}
                  style={{ height: `${Math.max(0, Math.min(100, (seg.value / top) * 100))}%` }}
                  title={seg.label}
                />
              ))}
            </div>
            <span className="dg-bars-s__label">{group.label}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

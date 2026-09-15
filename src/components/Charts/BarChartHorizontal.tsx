import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { ChartCard } from './ChartCard'

export interface BarChartHorizontalRow {
  name: ReactNode
  value: number
  /** Hotová hodnota k zobrazení (částka, počet). */
  valueLabel?: ReactNode
  /** Vyzdvižený řádek — v návrhu první v žebříčku. */
  highlight?: boolean
}

export interface BarChartHorizontalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  rows: BarChartHorizontalRow[]
  max?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Chart / Bars Horizontal — žebříček. Název a hodnota nad pruhem, takže se
 * nic nekrátí ani v úzké kartě; pruh je vždy na celou šířku.
 */
export function BarChartHorizontal({
  title,
  subtitle,
  rows,
  max,
  className,
  ...rest
}: BarChartHorizontalProps) {
  const top = max ?? Math.max(1, ...rows.map((r) => r.value))
  const classes = ['dg-bars-h', className].filter(Boolean).join(' ')

  return (
    <ChartCard className={classes} title={title} subtitle={subtitle} {...rest}>
      <div className="dg-bars-h__rows">
        {rows.map((row, i) => (
          <div key={i} className="dg-bars-h__row">
            <div className="dg-bars-h__top">
              <span className="dg-bars-h__name">{row.name}</span>
              {row.valueLabel != null ? (
                <span className="dg-bars-h__value">{row.valueLabel}</span>
              ) : null}
            </div>
            <span className="dg-bars-h__track">
              <span
                className={row.highlight ? 'dg-bars-h__fill dg-bars-h__fill--on' : 'dg-bars-h__fill'}
                style={{ width: `${Math.max(0, Math.min(100, (row.value / top) * 100))}%` }}
              />
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

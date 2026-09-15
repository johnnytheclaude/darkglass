import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DailyBar {
  /** Popisek pod sloupcem — v návrhu den v měsíci. */
  label: ReactNode
  value: number
  /** Vyzdvižený den (dnes, špička). */
  highlight?: boolean
}

export interface DailyBarsChartProps extends HTMLAttributes<HTMLDivElement> {
  /** Pilulky nad grafem (živě, počty) — typicky `FloatingPill`. */
  header?: ReactNode
  bars: DailyBar[]
  max?: number
  /** Přepínač období pod grafem — typicky `PeriodTabs`. */
  footer?: ReactNode
  /** Výška plochy grafu v px při --scale 1 (návrh 275). */
  plotHeight?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Chart / Denní sloupce — hlavní graf přehledu. Bez osy a bez legendy: čte se
 * z popisků dnů a vyzdviženého sloupce. Sloupce se dělí o šířku karty.
 */
export function DailyBarsChart({
  header,
  bars,
  max,
  footer,
  plotHeight = 275,
  className,
  ...rest
}: DailyBarsChartProps) {
  const top = max ?? Math.max(1, ...bars.map((b) => b.value))
  const classes = ['dg-daily-bars', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {header != null ? <div className="dg-daily-bars__head">{header}</div> : null}
      <div
        className="dg-daily-bars__plot"
        style={{ height: `calc(${plotHeight}px * var(--scale))` }}
      >
        {bars.map((bar, i) => (
          <div key={i} className="dg-daily-bars__col">
            <span
              className={bar.highlight ? 'dg-daily-bars__bar dg-daily-bars__bar--on' : 'dg-daily-bars__bar'}
              style={{ height: `${Math.max(0, Math.min(100, (bar.value / top) * 100))}%` }}
            />
            <span
              className={bar.highlight ? 'dg-daily-bars__label dg-daily-bars__label--on' : 'dg-daily-bars__label'}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>
      {footer != null ? <div className="dg-daily-bars__foot">{footer}</div> : null}
    </div>
  )
}

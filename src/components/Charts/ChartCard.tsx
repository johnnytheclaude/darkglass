import type { HTMLAttributes, ReactNode, Ref } from 'react'

/** Ladění série grafu. Barvy jsou vždy tokeny, nikdy hex v komponentě. */
export type ChartTone = 'accent' | 'purple' | 'success' | 'warning' | 'danger' | 'neutral'

export interface ChartCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nadpis karty (17/600 podle návrhu). */
  title?: ReactNode
  /** Podtitul — co se měří, v jakých jednotkách. */
  subtitle?: ReactNode
  /** Samotný graf. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * ChartCard — rám všech grafů z § Grafy: hlavička s nadpisem a podtitulem,
 * pod ní plocha grafu. Používají ho ostatní grafy, dá se použít i samostatně
 * pro vlastní vykreslení.
 */
export function ChartCard({ title, subtitle, children, className, ...rest }: ChartCardProps) {
  const classes = ['dg-chart-card', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {title != null || subtitle != null ? (
        <div className="dg-chart-card__head">
          {title != null ? <span className="dg-chart-card__title">{title}</span> : null}
          {subtitle != null ? <span className="dg-chart-card__sub">{subtitle}</span> : null}
        </div>
      ) : null}
      <div className="dg-chart-card__body">{children}</div>
    </div>
  )
}

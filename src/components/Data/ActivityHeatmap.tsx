import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ActivityHeatmapProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  /** Sloupec = týden, uvnitř dny odshora dolů. Hodnota je stupeň 0–2
      (0 = nic, 2 = nejvíc); vyšší čísla se ořežou na 2. */
  weeks: number[][]
  /** Popisky pod mřížkou; legenda se skryje, když jsou obě prázdné. */
  lessLabel?: ReactNode
  moreLabel?: ReactNode
  /** Popisek jedné buňky pro odečet myší — dostane týden a den. */
  cellTitle?: (week: number, day: number, level: number) => string
  ref?: Ref<HTMLDivElement>
}

const LEVELS = 3

/**
 * Mapa aktivity — § Data · rozšíření. Mřížka týdnů a dnů; sytost buňky říká,
 * kolik se ten den dělo. Stupně jsou tři, aby se daly rozeznat i na dálku.
 */
export function ActivityHeatmap({
  title,
  weeks,
  lessLabel = 'méně',
  moreLabel = 'více',
  cellTitle,
  className,
  ...rest
}: ActivityHeatmapProps) {
  const classes = ['dg-heatmap', className].filter(Boolean).join(' ')
  const hasLegend = lessLabel != null || moreLabel != null

  return (
    <div className={classes} {...rest}>
      {title != null ? <span className="dg-heatmap__title">{title}</span> : null}
      <div className="dg-heatmap__grid">
        {weeks.map((days, w) => (
          <div className="dg-heatmap__week" key={w}>
            {days.map((value, d) => {
              const level = Math.max(0, Math.min(LEVELS - 1, Math.round(value)))
              return (
                <span
                  className={`dg-heatmap__cell dg-heatmap__cell--l${level}`}
                  key={d}
                  title={cellTitle?.(w, d, level)}
                />
              )
            })}
          </div>
        ))}
      </div>
      {hasLegend ? (
        <div className="dg-heatmap__legend">
          {lessLabel != null ? <span className="dg-heatmap__legend-text">{lessLabel}</span> : null}
          <span className="dg-heatmap__swatch dg-heatmap__swatch--l0" aria-hidden="true" />
          <span className="dg-heatmap__swatch dg-heatmap__swatch--l1" aria-hidden="true" />
          <span className="dg-heatmap__swatch dg-heatmap__swatch--l2" aria-hidden="true" />
          {moreLabel != null ? <span className="dg-heatmap__legend-text">{moreLabel}</span> : null}
        </div>
      ) : null}
    </div>
  )
}

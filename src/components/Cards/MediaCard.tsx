import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface MediaCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Fotka — `img` nebo jiný prvek. Bez ní zůstane jen plocha. */
  photo?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  /** Popisek pilulky pod textem (např. „Dnes"). */
  statLabel?: ReactNode
  /** Hodnota v tmavém odznaku pilulky (např. „4 ks"). */
  statValue?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Card / Media — karta produktu s fotkou. Fotka drží horní část a vyplní,
 * co zbude; text a pilulka s údajem jsou vždy vidět celé.
 */
export function MediaCard({
  photo,
  title,
  subtitle,
  statLabel,
  statValue,
  className,
  ...rest
}: MediaCardProps) {
  const classes = ['dg-media-card', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="dg-media-card__photo">{photo}</div>
      {title != null || subtitle != null ? (
        <div className="dg-media-card__titles">
          {title != null ? <span className="dg-media-card__title">{title}</span> : null}
          {subtitle != null ? <span className="dg-media-card__sub">{subtitle}</span> : null}
        </div>
      ) : null}
      {statLabel != null || statValue != null ? (
        <div className="dg-media-card__pill">
          {statLabel != null ? <span className="dg-media-card__pill-label">{statLabel}</span> : null}
          {statValue != null ? <span className="dg-media-card__count">{statValue}</span> : null}
        </div>
      ) : null}
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nadpis karty; bez něj (a bez `sub`/`action`) se hlavička nekreslí. */
  title?: ReactNode
  sub?: ReactNode
  /** Akce vpravo v hlavičce — typicky IconButton. */
  action?: ReactNode
  /** Obsah karty se orámuje tichou plochou (návrh „Základní karta“). */
  framed?: boolean
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Card — skleněná karta, základní stavební kámen stránky. Sama nic neví
 * o obsahu: hlavička, tělo a nic víc.
 */
export function Card({ title, sub, action, framed = false, children, className, ...rest }: CardProps) {
  const hasHeader = title != null || sub != null || action != null
  const classes = ['dg-card', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {hasHeader ? (
        <div className="dg-card__header">
          <div className="dg-card__titles">
            {title != null ? <span className="dg-card__title">{title}</span> : null}
            {sub != null ? <span className="dg-card__sub">{sub}</span> : null}
          </div>
          {action != null ? <span className="dg-card__action">{action}</span> : null}
        </div>
      ) : null}
      {children != null ? (
        <div className={framed ? 'dg-card__body dg-card__body--framed' : 'dg-card__body'}>
          {children}
        </div>
      ) : null}
    </div>
  )
}

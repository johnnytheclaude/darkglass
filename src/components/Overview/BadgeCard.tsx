import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type BadgeCardTone = 'success' | 'warning' | 'danger' | 'accent' | 'neutral'

export interface BadgeCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  /** Popisek odznaku vedle titulku („Otevřená"). */
  badgeLabel?: ReactNode
  badgeTone?: BadgeCardTone
  /** Obsah karty — řádek osoby, údaje, cokoli. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Card / S odznakem — karta, jejíž hlavička nese stav (otevřená směna,
 * offline). Odznak se v úzkém místě zalomí pod titulek.
 */
export function BadgeCard({
  title,
  badgeLabel,
  badgeTone = 'success',
  children,
  className,
  ...rest
}: BadgeCardProps) {
  const classes = ['dg-badge-card', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="dg-badge-card__head">
        {title != null ? <span className="dg-badge-card__title">{title}</span> : null}
        {badgeLabel != null ? (
          <span className={`dg-badge-card__badge dg-badge-card__badge--${badgeTone}`}>
            <span className="dg-badge-card__dot" />
            {badgeLabel}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  )
}

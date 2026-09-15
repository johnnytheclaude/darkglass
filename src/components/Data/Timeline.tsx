import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type TimelineTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

export interface TimelineEventProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Barva kolečka — co se stalo (schváleno, odesláno, chyba). */
  tone?: TimelineTone
  /** Volitelná ikona dovnitř kolečka. */
  icon?: ReactNode
  title?: ReactNode
  /** Čas vpravo od nadpisu. */
  time?: ReactNode
  /** Kdo záznam způsobil. */
  who?: ReactNode
  ref?: Ref<HTMLLIElement>
}

/** Jeden záznam časové osy. Spojnici pod kolečkem kreslí CSS; poslední záznam
    v ose ji nemá. */
export function TimelineEvent({
  tone = 'neutral',
  icon,
  title,
  time,
  who,
  className,
  ...rest
}: TimelineEventProps) {
  const classes = ['dg-timeline__event', `dg-timeline__event--${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <li className={classes} {...rest}>
      <span className="dg-timeline__rail" aria-hidden="true">
        <span className="dg-timeline__dot">{icon}</span>
        <span className="dg-timeline__line" />
      </span>
      <span className="dg-timeline__text">
        <span className="dg-timeline__top">
          {title != null ? <span className="dg-timeline__title">{title}</span> : null}
          {time != null ? <span className="dg-timeline__time">{time}</span> : null}
        </span>
        {who != null ? <span className="dg-timeline__who">{who}</span> : null}
      </span>
    </li>
  )
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  children?: ReactNode
  ref?: Ref<HTMLOListElement>
}

/**
 * Časová osa — § Data · rozšíření. Historie záznamu odshora dolů: kolečko
 * s barvou podle toho, co se stalo, nadpis s časem a kdo za tím stojí.
 */
export function Timeline({ children, className, ...rest }: TimelineProps) {
  const classes = ['dg-timeline', className].filter(Boolean).join(' ')

  return (
    <ol className={classes} {...rest}>
      {children}
    </ol>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type RequestCardTone = 'accent' | 'warning' | 'danger' | 'success'

export interface RequestCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Ikona v kolečku vlevo. */
  icon?: ReactNode
  /** Nadpis („Žádost odeslána Tomáši Novotnému“). */
  title: ReactNode
  /** Podrobnosti pod nadpisem (čas, kanál, částka). */
  meta?: ReactNode
  /** Stav vpravo („čeká 0:42“). */
  badge?: ReactNode
  /** Barva ikony i odznaku. */
  tone?: RequestCardTone
  /** Tlačítka akcí pod hlavičkou. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Card / Žádost — čekající žádost (schválení vedoucím, potvrzení slevy).
 * Ikona a odznak nesou stav; akce zůstávají pod textem, aby se daly trefit.
 */
export function RequestCard({
  icon,
  title,
  meta,
  badge,
  tone = 'accent',
  children,
  className,
  ...rest
}: RequestCardProps) {
  return (
    <div
      className={['dg-request-card', `dg-request-card--${tone}`, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="dg-request-card__head">
        <span className="dg-request-card__icon" aria-hidden="true">
          {icon}
        </span>
        <span className="dg-request-card__text">
          <span className="dg-request-card__title">{title}</span>
          {meta != null ? <span className="dg-request-card__meta">{meta}</span> : null}
        </span>
        {badge != null ? <span className="dg-request-card__badge">{badge}</span> : null}
      </div>
      {children != null ? <div className="dg-request-card__actions">{children}</div> : null}
    </div>
  )
}

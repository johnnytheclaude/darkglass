import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface AccentCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nadpis karty („Nová verze 1.0.4 je připravená“). */
  title: ReactNode
  /** Vysvětlení pod nadpisem. */
  description?: ReactNode
  /** Akce přes celou šířku — obvykle Button s block. */
  action?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Card / Akcentová — zvýrazněné oznámení s jednou akcí (aktualizace, žádost).
 * Podklad je na akcentu, takže karta vystoupí z běžného seznamu.
 */
export function AccentCard({ title, description, action, className, ...rest }: AccentCardProps) {
  return (
    <div className={['dg-accent-card', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-accent-card__title">{title}</span>
      {description != null ? <span className="dg-accent-card__desc">{description}</span> : null}
      {action != null ? <span className="dg-accent-card__action">{action}</span> : null}
    </div>
  )
}

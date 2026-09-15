import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type KanbanStatusTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

export interface KanbanCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  /** Popisek stavu do odznaku v patičce („Čeká", „Probíhá"). */
  status?: ReactNode
  statusTone?: KanbanStatusTone
  /** Co stojí v patičce vpravo — typicky Avatar. */
  trailing?: ReactNode
  /** Vlastní obsah mezi nadpisem a patičkou. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/** Kartička na nástěnce. Patička se skládá až tehdy, když má co ukázat. */
export function KanbanCard({
  title,
  status,
  statusTone = 'neutral',
  trailing,
  children,
  className,
  ...rest
}: KanbanCardProps) {
  const classes = ['dg-kanban-card', className].filter(Boolean).join(' ')
  const hasFoot = status != null || trailing != null

  return (
    <div className={classes} {...rest}>
      {title != null ? <span className="dg-kanban-card__title">{title}</span> : null}
      {children}
      {hasFoot ? (
        <span className="dg-kanban-card__foot">
          {status != null ? (
            <span className={`dg-kanban-card__badge dg-kanban-card__badge--${statusTone}`}>
              <span className="dg-kanban-card__dot" aria-hidden="true" />
              {status}
            </span>
          ) : null}
          {trailing != null ? <span className="dg-kanban-card__trailing">{trailing}</span> : null}
        </span>
      ) : null}
    </div>
  )
}

export interface KanbanColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  /** Kolik kartiček ve sloupci je; zobrazí se v kolečku vedle nadpisu. */
  count?: ReactNode
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Sloupec nástěnky — § Data · rozšíření. Jeden stav procesu s hlavičkou,
 * počtem a kartičkami pod sebou.
 */
export function KanbanColumn({ title, count, children, className, ...rest }: KanbanColumnProps) {
  const classes = ['dg-kanban-column', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="dg-kanban-column__head">
        {title != null ? <span className="dg-kanban-column__title">{title}</span> : null}
        {count != null ? <span className="dg-kanban-column__count">{count}</span> : null}
      </div>
      {children}
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type TaskRowTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

export interface TaskRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Název úlohy („Řádky zboží · 14 z 22“). */
  name: ReactNode
  /** Stav úlohy do odznaku („probíhá“, „hotovo“). */
  badge?: ReactNode
  /** Barva odznaku. */
  tone?: TaskRowTone
  ref?: Ref<HTMLDivElement>
}

/**
 * Row / Úloha — dlouhá úloha se stavem (párování dodacího listu, inventura).
 * Stav je odznak vpravo, aby šel přečíst z jednoho sloupce přes celý seznam.
 */
export function TaskRow({ name, badge, tone = 'accent', className, ...rest }: TaskRowProps) {
  return (
    <div className={['dg-task-row', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-task-row__name">{name}</span>
      {badge != null ? (
        <span className={`dg-task-row__badge dg-task-row__badge--${tone}`}>{badge}</span>
      ) : null}
    </div>
  )
}

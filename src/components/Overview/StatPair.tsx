import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface StatPairItem {
  label: ReactNode
  value: ReactNode
}

export interface StatPairProps extends HTMLAttributes<HTMLDivElement> {
  /** Dva a víc údajů; mezi nimi se kreslí předěl. */
  items: StatPairItem[]
  ref?: Ref<HTMLDivElement>
}

/**
 * Stat / Dvojice — dvojice údajů s předělem (otevřeno v / trvá). Na úzké
 * obrazovce se zalomí a předěl zmizí.
 */
export function StatPair({ items, className, ...rest }: StatPairProps) {
  const classes = ['dg-stat-pair', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {items.map((item, i) => (
        <div key={i} className="dg-stat-pair__item">
          <span className="dg-stat-pair__label">{item.label}</span>
          <span className="dg-stat-pair__value">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

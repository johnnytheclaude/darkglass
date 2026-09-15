import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface QuickActionsCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nadpis karty — v návrhu drobný, ne jako titulek sekce. */
  title?: ReactNode
  /** Dlaždice akcí (`ActionTile`). */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Card / Rychlé akce — karta s dlaždicemi akcí. Dlaždice se dělí o šířku karty
 * a na úzké obrazovce se zalomí do dalšího řádku.
 */
export function QuickActionsCard({ title, children, className, ...rest }: QuickActionsCardProps) {
  const classes = ['dg-quick-actions', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {title != null ? <span className="dg-quick-actions__title">{title}</span> : null}
      <div className="dg-quick-actions__row">{children}</div>
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface BulkActionBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Kolik je vybráno — plná pilulka v akcentu. */
  count?: ReactNode
  /** Otázka vedle počtu („Co s nimi?"). */
  hint?: ReactNode
  /** Tlačítka akcí. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Lišta hromadných akcí — § Navigace · rozšíření. Plovoucí pruh nad seznamem,
 * který se objeví, jakmile je něco vybrané.
 */
export function BulkActionBar({ count, hint, children, className, ...rest }: BulkActionBarProps) {
  const classes = ['dg-bulk-bar', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="toolbar" {...rest}>
      {count != null ? <span className="dg-bulk-bar__count">{count}</span> : null}
      {hint != null ? <span className="dg-bulk-bar__hint">{hint}</span> : null}
      {children != null ? <span className="dg-bulk-bar__actions">{children}</span> : null}
    </div>
  )
}

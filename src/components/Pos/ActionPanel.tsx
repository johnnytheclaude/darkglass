import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ActionPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Co částka znamená („K vrácení zákazníkovi“). */
  caption: ReactNode
  /** Hlavní částka panelu. */
  amount: ReactNode
  /** Poznámka pod částkou. */
  note?: ReactNode
  /** Hlavní akce dole — obvykle Button s block. */
  action?: ReactNode
  /** Vysvětlivka pod akcí (pravidlo, výjimka). */
  footer?: ReactNode
  /** Obsah mezi poznámkou a akcí (volby, seznam). */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Panel / Akce — boční panel obrazovky s částkou a jednou hlavní akcí.
 * Akce drží u dolní hrany panelu i tehdy, když je obsah nad ní krátký.
 */
export function ActionPanel({
  caption,
  amount,
  note,
  action,
  footer,
  children,
  className,
  ...rest
}: ActionPanelProps) {
  return (
    <div className={['dg-action-panel', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-action-panel__caption">{caption}</span>
      <span className="dg-action-panel__amount">{amount}</span>
      {note != null ? <span className="dg-action-panel__note">{note}</span> : null}
      {children != null ? <div className="dg-action-panel__body">{children}</div> : null}
      <span className="dg-action-panel__rule" aria-hidden="true" />
      {action != null ? <div className="dg-action-panel__action">{action}</div> : null}
      {footer != null ? <span className="dg-action-panel__footer">{footer}</span> : null}
    </div>
  )
}

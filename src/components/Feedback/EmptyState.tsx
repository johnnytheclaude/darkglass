import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Ikona v kolečku nad nadpisem. */
  icon?: ReactNode
  title: ReactNode
  /** Věta, která říká, čím se prázdno zaplní. */
  children?: ReactNode
  actionLabel?: ReactNode
  actionIcon?: ReactNode
  onAction?: () => void
  ref?: Ref<HTMLDivElement>
}

/**
 * EmptyState — prázdný stav seznamu nebo stránky. Nikdy jen „nic tu není“:
 * vždy řekne, čím se místo zaplní, a nabídne jedinou akci.
 */
export function EmptyState({
  icon,
  title,
  children,
  actionLabel,
  actionIcon,
  onAction,
  className,
  ...rest
}: EmptyStateProps) {
  const classes = ['dg-empty', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {icon != null ? <span className="dg-empty__icon">{icon}</span> : null}
      <span className="dg-empty__title">{title}</span>
      {children != null ? <span className="dg-empty__body">{children}</span> : null}
      {actionLabel != null ? (
        <button type="button" className="dg-empty__action" onClick={onAction}>
          {actionIcon != null ? (
            <span className="dg-empty__action-icon">{actionIcon}</span>
          ) : null}
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

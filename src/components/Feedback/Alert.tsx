import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconAlert } from '../Icons/IconAlert'
import { IconCheck } from '../Icons/IconCheck'
import { IconInfo } from '../Icons/IconInfo'
import { IconX } from '../Icons/IconX'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone
  /** Nadpis — co se stalo. */
  title: ReactNode
  /** Tělo — co z toho plyne. */
  children?: ReactNode
  /** Ikona v dlaždici; bez ní se vezme ikona ladění. */
  icon?: ReactNode
  /** Popisek akce pod textem; bez něj se tlačítko nevykreslí. */
  actionLabel?: ReactNode
  onAction?: () => void
  onClose?: () => void
  closeLabel?: string
  ref?: Ref<HTMLDivElement>
}

const DEFAULT_ICON: Record<AlertTone, ReactNode> = {
  info: <IconInfo size={18} />,
  success: <IconCheck size={18} />,
  warning: <IconAlert size={18} />,
  danger: <IconAlert size={18} />,
}

/**
 * Alert — vysvětlující upozornění v ploše stránky. Nese nadpis, tělo,
 * nejvýš jednu akci a zavření; v úzkém místě se zalomí, nikdy nepřeteče.
 */
export function Alert({
  tone = 'info',
  title,
  children,
  icon,
  actionLabel,
  onAction,
  onClose,
  closeLabel = 'Zavřít upozornění',
  className,
  role,
  ...rest
}: AlertProps) {
  const classes = ['dg-alert', `dg-alert--${tone}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role={role ?? (tone === 'danger' ? 'alert' : 'status')} {...rest}>
      <span className="dg-alert__tile">{icon ?? DEFAULT_ICON[tone]}</span>
      <div className="dg-alert__text">
        <span className="dg-alert__title">{title}</span>
        {children != null ? <span className="dg-alert__body">{children}</span> : null}
        {actionLabel != null ? (
          <button type="button" className="dg-alert__action" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
      {onClose ? (
        <button type="button" className="dg-alert__close" onClick={onClose} aria-label={closeLabel}>
          <IconX size={13} />
        </button>
      ) : null}
    </div>
  )
}

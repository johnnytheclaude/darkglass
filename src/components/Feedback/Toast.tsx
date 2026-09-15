import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconAlert } from '../Icons/IconAlert'
import { IconCheck } from '../Icons/IconCheck'
import { IconInfo } from '../Icons/IconInfo'

export type ToastTone = 'success' | 'info' | 'warning' | 'danger'

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: ToastTone
  /** Nadpis oznámení — co se právě stalo. */
  title: ReactNode
  /** Podřádek s podrobností (počet, zařízení, čas). */
  sub?: ReactNode
  icon?: ReactNode
  /** Popisek jediné akce vpravo (typicky „Zpět“). */
  actionLabel?: ReactNode
  onAction?: () => void
  ref?: Ref<HTMLDivElement>
}

const DEFAULT_ICON: Record<ToastTone, ReactNode> = {
  success: <IconCheck size={17} />,
  info: <IconInfo size={17} />,
  warning: <IconAlert size={17} />,
  danger: <IconAlert size={17} />,
}

/**
 * Toast — plovoucí oznámení nad obsahem. Knihovna kreslí jen bublinu;
 * kam se umístí a jak dlouho zůstane, řeší aplikace.
 */
export function Toast({
  tone = 'success',
  title,
  sub,
  icon,
  actionLabel,
  onAction,
  className,
  role,
  ...rest
}: ToastProps) {
  const classes = ['dg-toast', `dg-toast--${tone}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role={role ?? 'status'} {...rest}>
      <span className="dg-toast__tile">{icon ?? DEFAULT_ICON[tone]}</span>
      <div className="dg-toast__text">
        <span className="dg-toast__title">{title}</span>
        {sub != null ? <span className="dg-toast__sub">{sub}</span> : null}
      </div>
      {actionLabel != null ? (
        <button type="button" className="dg-toast__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

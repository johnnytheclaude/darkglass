import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconAlert } from '../Icons/IconAlert'
import { IconCheck } from '../Icons/IconCheck'
import { IconInfo } from '../Icons/IconInfo'
import { IconX } from '../Icons/IconX'

export type BannerTone = 'warning' | 'danger' | 'success' | 'accent'

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Ladění pruhu; návrh má jako výchozí varování (končící zkušební období). */
  tone?: BannerTone
  /** Ikona vlevo; bez ní se vezme ikona ladění. */
  icon?: ReactNode
  /** Text pruhu — co se stalo a co z toho plyne. */
  children?: ReactNode
  /** Popisek akce vpravo; bez něj se tlačítko nevykreslí. */
  actionLabel?: ReactNode
  onAction?: () => void
  /** Zavření pruhu; bez handleru se křížek nevykreslí. */
  onClose?: () => void
  closeLabel?: string
  ref?: Ref<HTMLDivElement>
}

const DEFAULT_ICON: Record<BannerTone, ReactNode> = {
  warning: <IconAlert size={19} />,
  danger: <IconAlert size={19} />,
  success: <IconCheck size={19} />,
  accent: <IconInfo size={19} />,
}

/**
 * Banner — oznámení přes celou šířku nad obsahem. Nese jednu akci a zavření;
 * v úzkém místě se akce zalomí pod text, pruh nikdy nepřeteče.
 */
export function Banner({
  tone = 'warning',
  icon,
  children,
  actionLabel,
  onAction,
  onClose,
  closeLabel = 'Zavřít oznámení',
  className,
  role,
  ...rest
}: BannerProps) {
  const classes = ['dg-banner', `dg-banner--${tone}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role={role ?? (tone === 'danger' ? 'alert' : 'status')} {...rest}>
      <span className="dg-banner__icon" aria-hidden="true">
        {icon ?? DEFAULT_ICON[tone]}
      </span>
      <span className="dg-banner__text">{children}</span>
      {actionLabel != null ? (
        <button type="button" className="dg-banner__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
      {onClose ? (
        <button
          type="button"
          className="dg-banner__close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <IconX size={14} />
        </button>
      ) : null}
    </div>
  )
}

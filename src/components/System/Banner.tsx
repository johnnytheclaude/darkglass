import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconX } from '../Icons/IconX'

export type BannerTone = 'warning' | 'danger' | 'success' | 'accent'

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Ladění pruhu; návrh má jako výchozí varování (končící zkušební období). */
  tone?: BannerTone
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

/**
 * Banner — oznámení přes celou šířku nad obsahem. Nese jednu akci a zavření;
 * v úzkém místě se akce zalomí pod text, pruh nikdy nepřeteče.
 */
export function Banner({
  tone = 'warning',
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
          <IconX size={15} />
        </button>
      ) : null}
    </div>
  )
}

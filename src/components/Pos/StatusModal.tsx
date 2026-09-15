import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconX } from '../Icons/IconX'

export type StatusModalTone = 'accent' | 'warning' | 'danger' | 'success'

export interface StatusModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Ikona v dlaždici vlevo nahoře. */
  icon?: ReactNode
  /** Nadpis („3 doklady se nepodařilo odeslat“). */
  title: ReactNode
  /** Technické podrobnosti pod nadpisem (služba, čas, odpověď). */
  meta?: ReactNode
  /** Barva dlaždice podle závažnosti. */
  tone?: StatusModalTone
  /** Pruh s upozorněním — obvykle InlineNotice. */
  notice?: ReactNode
  /** Vysvětlení, co s tím má obsluha dělat. */
  hint?: ReactNode
  /** Tlačítka dole, zarovnaná doprava. */
  footer?: ReactNode
  /** Zavření křížkem; bez něj se křížek nevykreslí. */
  onClose?: () => void
  /** Obsah modálu — seznam dokladů, úloh nebo chyb. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Modal / Stavový — modál se stavem fronty, tiskárny nebo odesílání.
 * Říká tři věci: co se stalo, co to znamená pro prodej a co udělat dál.
 */
export function StatusModal({
  icon,
  title,
  meta,
  tone = 'danger',
  notice,
  hint,
  footer,
  onClose,
  children,
  className,
  role,
  ...rest
}: StatusModalProps) {
  return (
    <div
      className={['dg-status-modal', `dg-status-modal--${tone}`, className]
        .filter(Boolean)
        .join(' ')}
      role={role ?? 'dialog'}
      aria-modal="true"
      {...rest}
    >
      <div className="dg-status-modal__head">
        <span className="dg-status-modal__tile" aria-hidden="true">
          {icon}
        </span>
        <span className="dg-status-modal__text">
          <span className="dg-status-modal__title">{title}</span>
          {meta != null ? <span className="dg-status-modal__meta">{meta}</span> : null}
        </span>
        {onClose ? (
          <button
            type="button"
            className="dg-status-modal__close"
            onClick={onClose}
            aria-label="Zavřít"
          >
            <IconX size={16} />
          </button>
        ) : null}
      </div>
      {notice != null ? <div className="dg-status-modal__notice">{notice}</div> : null}
      {children != null ? <div className="dg-status-modal__body">{children}</div> : null}
      {hint != null ? <span className="dg-status-modal__hint">{hint}</span> : null}
      {footer != null ? <div className="dg-status-modal__footer">{footer}</div> : null}
    </div>
  )
}

export interface StatusModalLineProps extends HTMLAttributes<HTMLDivElement> {
  /** Popis položky („P01-2026-000122 · 14:12 · 1 890 Kč“). */
  label: ReactNode
  /** Výsledek vpravo („401 · neplatný API klíč“). */
  status?: ReactNode
  /** Výsledek je chyba — vykreslí se červeně. */
  error?: boolean
  ref?: Ref<HTMLDivElement>
}

/** Řádek seznamu uvnitř stavového modálu. */
export function StatusModalLine({
  label,
  status,
  error = false,
  className,
  ...rest
}: StatusModalLineProps) {
  return (
    <div className={['dg-status-modal__line', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-status-modal__line-label">{label}</span>
      {status != null ? (
        <span
          className={['dg-status-modal__line-status', error ? 'is-error' : null]
            .filter(Boolean)
            .join(' ')}
        >
          {status}
        </span>
      ) : null}
    </div>
  )
}

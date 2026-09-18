import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconX } from '../Icons/IconX'
import { useEscapeClose } from '../Overlays/useEscapeClose'
import { Spinner } from '../System/Spinner'

export type StatusModalTone = 'accent' | 'warning' | 'danger' | 'success' | 'neutral'

/** Čtyři stavy, ve kterých Pokladna modál ukazuje: čekání na terminál nebo
    tiskárnu, dobrý konec, chyba a zrušená úloha. */
export type StatusModalState = 'progress' | 'success' | 'error' | 'canceled'

const STATE_TONE: Record<StatusModalState, StatusModalTone> = {
  progress: 'accent',
  success: 'success',
  error: 'danger',
  canceled: 'neutral',
}

export interface StatusModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Ikona v dlaždici vlevo nahoře. Ve stavu `progress` ji zastoupí kolečko. */
  icon?: ReactNode
  /** Nadpis („3 doklady se nepodařilo odeslat“). */
  title: ReactNode
  /** Technické podrobnosti pod nadpisem (služba, čas, odpověď). */
  meta?: ReactNode
  /** Průběh úlohy; určuje i výchozí barvu dlaždice. */
  state?: StatusModalState
  /** Barva dlaždice podle závažnosti — přebíjí barvu odvozenou ze `state`. */
  tone?: StatusModalTone
  /** Pruh s upozorněním — obvykle InlineNotice. */
  notice?: ReactNode
  /** Vysvětlení, co s tím má obsluha dělat. */
  hint?: ReactNode
  /** Tlačítka dole, zarovnaná doprava — u nevratné akce `DialogActions`. */
  footer?: ReactNode
  /** Dotykový displej: akce v patce dostanou výšku 52 px. */
  touch?: boolean
  /** Širší rám (560 px) pro souhrn delší úlohy — jinak 420 px z návrhu. */
  wide?: boolean
  /** Zavření křížkem; bez něj se křížek nevykreslí. */
  onClose?: () => void
  /** Escape zavírá modál. Vypni jen tam, kde si klávesu bere aplikace. */
  closeOnEscape?: boolean
  /** Obsah modálu — seznam dokladů, úloh nebo chyb. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Modal / Stavový — modál se stavem fronty, tiskárny nebo odesílání.
 * Říká tři věci: co se stalo, co to znamená pro prodej a co udělat dál.
 * Umí čekání (`progress`), úspěch, chybu i zrušení; z každého z nich se dá
 * odejít klávesnicí — Escape zavírá a křížek je běžné tlačítko v pořadí tabem.
 */
export function StatusModal({
  icon,
  title,
  meta,
  state,
  tone,
  notice,
  hint,
  footer,
  touch = false,
  wide = false,
  onClose,
  closeOnEscape = true,
  children,
  className,
  role,
  ...rest
}: StatusModalProps) {
  useEscapeClose(onClose, closeOnEscape)

  const resolvedTone = tone ?? (state ? STATE_TONE[state] : 'danger')
  const progress = state === 'progress'
  const classes = [
    'dg-status-modal',
    `dg-status-modal--${resolvedTone}`,
    state ? `dg-status-modal--state-${state}` : null,
    touch ? 'dg-status-modal--touch' : null,
    wide ? 'dg-status-modal--wide' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      role={role ?? 'dialog'}
      aria-modal="true"
      aria-busy={progress || undefined}
      {...rest}
    >
      <div className="dg-status-modal__head">
        <span className="dg-status-modal__tile" aria-hidden={progress ? undefined : 'true'}>
          {progress && icon == null ? <Spinner size="s" label="Čekám…" /> : icon}
        </span>
        <span className="dg-status-modal__text" aria-live={progress ? 'polite' : undefined}>
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

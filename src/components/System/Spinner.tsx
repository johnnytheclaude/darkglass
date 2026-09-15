import type { HTMLAttributes, Ref } from 'react'

export type SpinnerSize = 's' | 'm' | 'l'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Hrana podle návrhu: s 36, m 52, l 72 px (škáluje se přes --scale). */
  size?: SpinnerSize
  /** Co se načítá — text nese aria-label, na obrazovce není vidět. */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Spinner — načítání. Kolo má ztlumenou stopu a akcentový oblouk, takže se
 * pozná i na barevné ploše; pohyb se v režimu omezeného pohybu zpomalí.
 * Kreslí se v SVG, ne otáčeným divem: otáčený box by rodiči rozhoupal
 * scrollWidth a v kontrole layoutu vypadal jako přetečení.
 */
export function Spinner({ size = 'm', label = 'Načítám…', className, ...rest }: SpinnerProps) {
  const classes = ['dg-spinner', `dg-spinner--${size}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="status" aria-live="polite" aria-label={label} {...rest}>
      <svg className="dg-spinner__ring" viewBox="0 0 50 50" aria-hidden="true" focusable="false">
        <circle className="dg-spinner__track" cx="25" cy="25" r="21" />
        <circle className="dg-spinner__arc" cx="25" cy="25" r="21" />
      </svg>
    </div>
  )
}

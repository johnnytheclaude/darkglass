import type { HTMLAttributes, Ref } from 'react'

export type SpinnerSize = 's' | 'm' | 'l'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Hrana podle návrhu: s 36, m 52, l 72 px (škáluje se přes --scale). */
  size?: SpinnerSize
  /** Co se načítá — text nese aria-label, na obrazovce není vidět. */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/** Tloušťka stopy podle návrhu (2,52 / 3,12 / 3,6 px) přepočtená do soustavy
    viewBoxu 50; poloměr dopočítaný tak, aby kolo lícovalo s hranou. */
const GEOMETRY: Record<SpinnerSize, { stroke: number; radius: number }> = {
  s: { stroke: 3.5, radius: 23.25 },
  m: { stroke: 3, radius: 23.5 },
  l: { stroke: 2.5, radius: 23.75 },
}

/**
 * Spinner — načítání. Kolo má ztlumenou stopu a akcentový oblouk, takže se
 * pozná i na barevné ploše; pohyb se v režimu omezeného pohybu zpomalí.
 * Kreslí se v SVG, ne otáčeným divem: otáčený box by rodiči rozhoupal
 * scrollWidth a v kontrole layoutu vypadal jako přetečení.
 */
export function Spinner({ size = 'm', label = 'Načítám…', className, ...rest }: SpinnerProps) {
  const classes = ['dg-spinner', `dg-spinner--${size}`, className].filter(Boolean).join(' ')
  const { stroke, radius } = GEOMETRY[size]

  return (
    <div className={classes} role="status" aria-live="polite" aria-label={label} {...rest}>
      <svg className="dg-spinner__ring" viewBox="0 0 50 50" aria-hidden="true" focusable="false">
        <circle className="dg-spinner__track" cx="25" cy="25" r={radius} strokeWidth={stroke} />
        <circle
          className="dg-spinner__arc"
          cx="25"
          cy="25"
          r={radius}
          strokeWidth={stroke}
          pathLength={100}
        />
      </svg>
    </div>
  )
}

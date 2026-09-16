import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface CountDisplayProps extends HTMLAttributes<HTMLDivElement> {
  /** Zadaný počet — píše se do něj klávesnicí, proto největší písmo obrazovky. */
  value: ReactNode
  /** Jednotka za číslem („ks“); návrh ji u inventury nekreslí, jinde se hodí. */
  unit?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Zadaný počet — § Pokladna · platba (návrh mobilu, obrazovka Inventura).
 * Velké pole, do kterého obsluha ťuká počet kusů: je vidět na délku paže
 * a rámeček v akcentu říká, že se právě píše sem. Otázka nad polem patří
 * obrazovce (`GroupCaption`), tohle je jen hodnota.
 */
export function CountDisplay({ value, unit, className, ...rest }: CountDisplayProps) {
  return (
    <div
      className={['dg-count-display', className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
      {...rest}
    >
      <span className="dg-count-display__value">{value}</span>
      {unit != null ? <span className="dg-count-display__unit">{unit}</span> : null}
    </div>
  )
}

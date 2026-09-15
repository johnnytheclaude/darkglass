import type { HTMLAttributes, Ref } from 'react'

export interface PinDotsProps extends HTMLAttributes<HTMLDivElement> {
  /** Kolik číslic PIN má (návrh ukazuje čtyři). */
  length?: number
  /** Kolik číslic je zadaných. */
  filled?: number
  /** Popis pro čtečku; bez něj se složí z počtu zadaných číslic. */
  label?: string
  /**
   * Od kolikáté číslice je PIN nepovinný — pokladna bere čtyři až šest číslic
   * a obsluha musí poznat, kde smí přestat. Tečky za touhle hranicí jsou tišší.
   */
  optionalFrom?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Tečky PIN — § Pokladna · platba.
 * Ukazují počet zadaných číslic, nikdy ne samotný PIN.
 */
export function PinDots({ length = 4, filled = 0, label, optionalFrom, className, ...rest }: PinDotsProps) {
  const zadano = Math.max(0, Math.min(filled, length))

  return (
    <div
      className={['dg-pin-dots', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={label ?? `Zadáno ${zadano} ze ${length} číslic`}
      {...rest}
    >
      {Array.from({ length }, (_, index) => (
        <span
          key={index}
          className={[
            'dg-pin-dots__dot',
            index < zadano ? 'is-filled' : null,
            optionalFrom != null && index >= optionalFrom ? 'is-optional' : null,
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ))}
    </div>
  )
}

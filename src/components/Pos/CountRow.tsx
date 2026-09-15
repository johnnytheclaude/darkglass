import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type CountRowTone = 'ok' | 'error' | 'info' | 'neutral'

export interface CountRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Název položky („Sako PREMIUM · vel. 48“). */
  name: ReactNode
  /** Očekávaný stav podle skladu. */
  expected: ReactNode
  /** Spočítaný stav podle obsluhy. */
  counted: ReactNode
  /** Rozdíl se znaménkem („0“, „−1“, „+1“). */
  difference: ReactNode
  /** Ladění řádku: sedí (ok), manko (error), přebytek (info). */
  tone?: CountRowTone
  ref?: Ref<HTMLDivElement>
}

/**
 * Row / Tint OK · Chyba · Info — řádek inventury se třemi čísly.
 * Podklad i barva rozdílu nesou výsledek, aby se dal přečíst bez počítání.
 */
export function CountRow({
  name,
  expected,
  counted,
  difference,
  tone = 'neutral',
  className,
  ...rest
}: CountRowProps) {
  const classes = ['dg-count-row', `dg-count-row--${tone}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <span className="dg-count-row__name">{name}</span>
      <span className="dg-count-row__value">{expected}</span>
      <span className="dg-count-row__value">{counted}</span>
      <span className="dg-count-row__diff">{difference}</span>
    </div>
  )
}

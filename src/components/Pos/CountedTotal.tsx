import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface CountedTotalProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek nad částkou („Spočítáno celkem“). */
  label?: ReactNode
  /** Součet napočítané hotovosti. */
  value: ReactNode
  /** Řádek pod částkou („17 bankovek · 3 mince“). */
  meta?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Spočítáno celkem — § Pokladna · platba.
 * Součet slepého počítání kasy: dokud obsluha neuzavře směnu, neporovnává se
 * s očekávaným stavem — proto tu není žádný rozdíl, jen napočítaná částka.
 */
export function CountedTotal({ label, value, meta, className, ...rest }: CountedTotalProps) {
  return (
    <div className={['dg-counted-total', className].filter(Boolean).join(' ')} {...rest}>
      {label != null ? <span className="dg-counted-total__label">{label}</span> : null}
      <span className="dg-counted-total__value">{value}</span>
      {meta != null ? <span className="dg-counted-total__meta">{meta}</span> : null}
    </div>
  )
}

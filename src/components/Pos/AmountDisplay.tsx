import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface AmountDisplayProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek před částkou („Přijato hotově“). */
  label?: ReactNode
  /** Zadaná částka — čte se ze dvou metrů, takže největší písmo v řádku. */
  value: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Zadaná částka — § Pokladna · platba.
 * Částka se nezalamuje: nevejde-li se do šířky, zmenší se řez písma, ale
 * nikdy pod hranici, která je z odstupu obsluhy ještě čitelná.
 */
export function AmountDisplay({ label, value, className, ...rest }: AmountDisplayProps) {
  return (
    <div className={['dg-amount-display', className].filter(Boolean).join(' ')} {...rest}>
      {label != null ? <span className="dg-amount-display__label">{label}</span> : null}
      <span className="dg-amount-display__value">{value}</span>
    </div>
  )
}

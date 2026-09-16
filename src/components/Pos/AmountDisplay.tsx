import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type AmountDisplaySize = 'auto' | 'display'

export interface AmountDisplayProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek před částkou („Přijato hotově“). */
  label?: ReactNode
  /** Zadaná částka — čte se ze dvou metrů, takže největší písmo v řádku. */
  value: ReactNode
  /**
   * `auto` (výchozí) přizpůsobuje částku šířce prvku — tak ji chce platba na
   * pokladně, kde je vedle popisku. `display` je pevných 44 px z návrhu
   * telefonu (artboard mobil/08): hodnota stojí na vlastním řádku pod
   * popiskem, takže se zmenšovat nemá.
   */
  size?: AmountDisplaySize
  ref?: Ref<HTMLDivElement>
}

/**
 * Zadaná částka — § Pokladna · platba.
 * Částka se nezalamuje: nevejde-li se do šířky, zmenší se řez písma, ale
 * nikdy pod hranici, která je z odstupu obsluhy ještě čitelná.
 */
export function AmountDisplay({ label, value, size = 'auto', className, ...rest }: AmountDisplayProps) {
  return (
    <div
      className={['dg-amount-display', size === 'display' && 'dg-amount-display--display', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {label != null ? <span className="dg-amount-display__label">{label}</span> : null}
      <span className="dg-amount-display__value">{value}</span>
    </div>
  )
}

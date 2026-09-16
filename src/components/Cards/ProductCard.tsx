import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Název zboží i s barvou nebo provedením („Sako CITY CLASSIC · modrá“). */
  name: ReactNode
  /** Cena — největší text karty, čte se první. */
  price: ReactNode
  /** Poznámka u ceny („akce“); stojí vedle částky, ne místo ní. */
  priceNote?: ReactNode
  /** Řádek pod cenou: odkud údaj je a jaký kód se načetl. */
  meta?: ReactNode
  /** Cokoli dalšího pod hlavičkou karty. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Karta / Produkt — co se právě načetlo: název, cena a odkud to je.
 * Je to hlavička pracovní obrazovky telefonu (dostupnost, přecenění), ne
 * dlaždice katalogu — proto velká cena a žádná miniatura.
 */
export function ProductCard({
  name,
  price,
  priceNote,
  meta,
  children,
  className,
  ...rest
}: ProductCardProps) {
  return (
    <div className={['dg-product-card', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-product-card__name">{name}</span>
      <span className="dg-product-card__price">
        {price}
        {priceNote != null ? <span className="dg-product-card__price-note">{priceNote}</span> : null}
      </span>
      {meta != null ? <span className="dg-product-card__meta">{meta}</span> : null}
      {children}
    </div>
  )
}

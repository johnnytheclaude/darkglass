import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

// `name` je název zboží, ne jméno formulářového pole — nativní atribut ustupuje.
export interface ProductTileProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'name'> {
  /** Název zboží — láme se na dva řádky, delší se ukončí výpustkou. */
  name: ReactNode
  /** Prodejní cena („9 990 Kč“). */
  price: ReactNode
  /** Řádek pod názvem — varianta zboží nebo jejich počet („3 varianty“). */
  note?: ReactNode
  /** Původní cena u akce („10 990“) — vykreslí se přeškrtnutá. */
  oldPrice?: ReactNode
  /** Popisek akce („AKCE do 15. 9.“). */
  saleLabel?: ReactNode
  /** Vybraná dlaždice (Tile / Product Selected). */
  selected?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * Tile / Product — dlaždice zboží na prodejní obrazovce.
 * Tři stavy z návrhu: běžná, vybraná (akcent) a v akci (popisek + stará cena).
 * Návrh dlaždici kreslí bez podtitulku; `note` je pro zboží, které se prodává
 * ve variantách — jinak by z dlaždice nešlo poznat, co klepnutí přidá.
 */
export function ProductTile({
  name,
  price,
  note,
  oldPrice,
  saleLabel,
  selected = false,
  type = 'button',
  className,
  ...rest
}: ProductTileProps) {
  const classes = ['dg-product-tile', selected ? 'is-selected' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} aria-pressed={selected || undefined} {...rest}>
      <span className="dg-product-tile__name">{name}</span>
      {note != null ? <span className="dg-product-tile__note">{note}</span> : null}
      {saleLabel != null ? <span className="dg-product-tile__sale">{saleLabel}</span> : null}
      <span className="dg-product-tile__price">
        {oldPrice != null ? <s className="dg-product-tile__old">{oldPrice}</s> : null}
        <span className="dg-product-tile__value">{price}</span>
      </span>
    </button>
  )
}

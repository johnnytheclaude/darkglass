import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

/**
 * Oznaceni pravidla akce na dlazdici: nazev akce a co dava (nebo co k ni chybi)
 * jsou dve casti odlisene sazbou, ne interpunkci — „DNY MARIANE −20 %".
 * Prosty ReactNode je jeden nedeleny stitek (zpetne kompatibilni).
 */
export interface ProductTilePromotion {
  /** Nazev akce („DNY MARIANE"). */
  name: ReactNode
  /** Vyse slevy nebo podminka („−20 %", „od 2 000 Kč"). */
  detail?: ReactNode
}

export type ProductTilePromotionLabel = ReactNode | ProductTilePromotion

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
  /**
   * Oznaceni pravidla akce, ktere na zbozi plati („DNY MARIANE" + „−20 %").
   * Je to jiny stav nez `saleLabel`: akcni cena polozky cenu meni (a kresli se
   * s preskrtnutou starou cenou), kdezto pravidlo akce se pocita az nad
   * kosikem — cena na dlazdici zustava. Proto vlastni tichy stitek, ne akcent,
   * a stoji u popisu zbozi, ne u ceny (task #865).
   */
  promotionLabels?: readonly ProductTilePromotionLabel[]
  /** Vybraná dlaždice (Tile / Product Selected). */
  selected?: boolean
  ref?: Ref<HTMLButtonElement>
}

function isPromotion(label: ProductTilePromotionLabel): label is ProductTilePromotion {
  return typeof label === 'object' && label !== null && !Array.isArray(label) && 'name' in label
}

/**
 * Tile / Product — dlaždice zboží na prodejní obrazovce.
 * Tři stavy z návrhu: běžná, vybraná (akcent) a v akci (popisek + stará cena).
 * Návrh dlaždici kreslí bez podtitulku; `note` je pro zboží, které se prodává
 * ve variantách — jinak by z dlaždice nešlo poznat, co klepnutí přidá.
 *
 * Nazev s podtitulkem tvori hlavicku s pevnou minimalni vyskou (dva radky
 * nazvu + radek podtitulku): stitek pravidla akce pod ni pak stoji v mrizce
 * u vsech dlazdic stejne vysoko, at ma nazev jeden nebo dva radky a podtitulek
 * je, nebo neni. Cena sedi vzdy u dolni hrany.
 */
export function ProductTile({
  name,
  price,
  note,
  oldPrice,
  saleLabel,
  promotionLabels,
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
      <span className="dg-product-tile__head">
        <span className="dg-product-tile__name">{name}</span>
        {note != null ? <span className="dg-product-tile__note">{note}</span> : null}
      </span>
      {promotionLabels && promotionLabels.length > 0 ? (
        <span className="dg-product-tile__promotions">
          {promotionLabels.map((label, index) =>
            isPromotion(label) ? (
              <span className="dg-product-tile__promotion" key={index}>
                <span className="dg-product-tile__promotion-name">{label.name}</span>
                {label.detail != null ? (
                  <span className="dg-product-tile__promotion-detail">{label.detail}</span>
                ) : null}
              </span>
            ) : (
              <span className="dg-product-tile__promotion" key={index}>
                {label}
              </span>
            ),
          )}
        </span>
      ) : null}
      {saleLabel != null ? <span className="dg-product-tile__sale">{saleLabel}</span> : null}
      <span className="dg-product-tile__price">
        {oldPrice != null ? <s className="dg-product-tile__old">{oldPrice}</s> : null}
        <span className="dg-product-tile__value">{price}</span>
      </span>
    </button>
  )
}

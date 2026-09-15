import type { HTMLAttributes, ReactNode, Ref } from 'react'

// `title` je tu nadpis karty, ne bublina prohlížeče — nativní atribut proto ustupuje.
export interface CartCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Titulek karty; výchozí nechává aplikace na sobě (knihovna texty nenese). */
  title?: ReactNode
  /** Počet položek a kusů („3 položky · 4 ks“). */
  count?: ReactNode
  /** Textová akce vpravo v hlavičce („Zrušit účet“). */
  actionLabel?: ReactNode
  onAction?: () => void
  /** Řádky účtu — typicky CartLine. */
  children?: ReactNode
  /** Blok pod řádky (souhrn, tlačítka) — zůstává vidět, i když řádky rolují. */
  footer?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Cart Lines — karta rozepsaného účtu.
 * Řádky rolují uvnitř karty, hlavička a patička zůstávají na místě.
 */
export function CartCard({
  title,
  count,
  actionLabel,
  onAction,
  footer,
  className,
  children,
  ...rest
}: CartCardProps) {
  return (
    <div className={['dg-cart-card', className].filter(Boolean).join(' ')} {...rest}>
      {title != null || count != null || actionLabel != null ? (
        <div className="dg-cart-card__head">
          {title != null ? <span className="dg-cart-card__title">{title}</span> : null}
          {count != null ? <span className="dg-cart-card__count">{count}</span> : null}
          {actionLabel != null ? (
            <button type="button" className="dg-cart-card__action" onClick={onAction}>
              {actionLabel}
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="dg-cart-card__lines">{children}</div>
      {footer != null ? <div className="dg-cart-card__footer">{footer}</div> : null}
    </div>
  )
}

export interface CartLineProps extends HTMLAttributes<HTMLDivElement> {
  /** Název položky i s variantou. */
  name: ReactNode
  /** Druhý řádek — kód, jednotková cena, poznámka. */
  note?: ReactNode
  /** Cena řádku. */
  price: ReactNode
  /** Množství; bez obslužných funkcí se ukáže jen číslo. */
  quantity?: ReactNode
  onDecrease?: () => void
  onIncrease?: () => void
  /** Popisky pro čtečku u tlačítek množství. */
  decreaseLabel?: string
  increaseLabel?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Řádek účtu v Cart Lines — název s poznámkou, cena a krokovač množství.
 * Tlačítka krokovače mají 44 px, aby se trefila prstem. Klik na ně se dál
 * nešíří — řádek bývá sám klikatelný (detail položky) a krokovač by ho
 * otevíral při každé změně množství.
 */
export function CartLine({
  name,
  note,
  price,
  quantity,
  onDecrease,
  onIncrease,
  decreaseLabel = 'Ubrat',
  increaseLabel = 'Přidat',
  className,
  ...rest
}: CartLineProps) {
  return (
    <div className={['dg-cart-line', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-cart-line__text">
        <span className="dg-cart-line__name">{name}</span>
        {note != null ? <span className="dg-cart-line__note">{note}</span> : null}
      </span>
      <span className="dg-cart-line__price">{price}</span>
      {quantity != null ? (
        <span className="dg-cart-line__stepper">
          {onDecrease ? (
            <button
              type="button"
              className="dg-cart-line__step"
              onClick={(event) => {
                event.stopPropagation()
                onDecrease()
              }}
              aria-label={decreaseLabel}
            >
              −
            </button>
          ) : null}
          <span className="dg-cart-line__quantity">{quantity}</span>
          {onIncrease ? (
            <button
              type="button"
              className="dg-cart-line__step"
              onClick={(event) => {
                event.stopPropagation()
                onIncrease()
              }}
              aria-label={increaseLabel}
            >
              +
            </button>
          ) : null}
        </span>
      ) : null}
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface QuantityRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Název položky. */
  name: ReactNode
  /** Poznámka pod názvem („po věrnostní slevě 5 %“). */
  note?: ReactNode
  /** Cena řádku. */
  price?: ReactNode
  /** Množství — řízená hodnota. */
  quantity: number
  /** Ubrat kus; chybí-li, je tlačítko neaktivní. */
  onDecrease?: () => void
  /** Přidat kus. */
  onIncrease?: () => void
  /** Pod touto hranicí se ubírat nedá (výchozí 1). */
  min?: number
  /** Popisek množství pro čtečku („kusů“). */
  quantityLabel?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * ListRow / Množství — položka s krokovačem množství.
 * Tlačítka jsou 44 px velká, aby se dala trefit prstem i na tabletu.
 */
export function QuantityRow({
  name,
  note,
  price,
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  quantityLabel = 'Množství',
  className,
  ...rest
}: QuantityRowProps) {
  return (
    <div className={['dg-quantity-row', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-quantity-row__text">
        <span className="dg-quantity-row__name">{name}</span>
        {note != null ? <span className="dg-quantity-row__note">{note}</span> : null}
      </span>
      {price != null ? <span className="dg-quantity-row__price">{price}</span> : null}
      <span className="dg-quantity-row__stepper">
        <button
          type="button"
          className="dg-quantity-row__step"
          onClick={onDecrease}
          disabled={onDecrease == null || quantity <= min}
          aria-label="Ubrat kus"
        >
          <span aria-hidden="true">−</span>
        </button>
        <span className="dg-quantity-row__count" aria-label={quantityLabel}>
          {quantity}
        </span>
        <button
          type="button"
          className="dg-quantity-row__step"
          onClick={onIncrease}
          disabled={onIncrease == null}
          aria-label="Přidat kus"
        >
          <span aria-hidden="true">+</span>
        </button>
      </span>
    </div>
  )
}

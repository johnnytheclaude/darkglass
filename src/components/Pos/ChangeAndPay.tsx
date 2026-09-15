import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ChangeAndPayProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek částky k vrácení („Vrátit“). */
  changeLabel?: ReactNode
  /** Kolik se vrací zákazníkovi. */
  change: ReactNode
  /** Popisek potvrzovacího tlačítka („Zaplatit“). */
  payLabel?: ReactNode
  onPay?: () => void
  payDisabled?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * Vrátit a potvrdit — § Pokladna · platba.
 * Poslední krok platby: kolik se vrací a tlačítko, kterým se účet uzavře.
 * Tlačítko má 78 px — je to nejčastěji mačkaný prvek na pokladně.
 */
export function ChangeAndPay({
  changeLabel = 'Vrátit',
  change,
  payLabel = 'Zaplatit',
  onPay,
  payDisabled = false,
  className,
  ...rest
}: ChangeAndPayProps) {
  return (
    <div className={['dg-change-pay', className].filter(Boolean).join(' ')} {...rest}>
      <div className="dg-change-pay__change">
        <span className="dg-change-pay__change-label">{changeLabel}</span>
        <span className="dg-change-pay__change-value">{change}</span>
      </div>
      <button type="button" className="dg-change-pay__pay" disabled={payDisabled} onClick={onPay}>
        {payLabel}
      </button>
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DenominationRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Nominál bankovky nebo mince („5 000“). */
  denomination: ReactNode
  /** Napočítaný počet kusů. */
  count: ReactNode
  /** Kolik ten nominál dělá dohromady („10 000“). */
  sum?: ReactNode
  onDecrease?: () => void
  onIncrease?: () => void
  /**
   * Přepsání počtu číslicemi. Krokovač je na pár kusů, ale patnáct bankovek
   * se klepáním nepočítá — s tímhle propem je počet pole, do kterého jde
   * číslo rovnou napsat. Bez něj zůstane počet jen text.
   */
  onCountChange?: (count: number) => void
  /** Popisek pole počtu pro čtečku; doplň nominál („5 000 Kč — počet kusů“). */
  countLabel?: string
  /** Popisky pro čtečku; doplň nominál, počítá-li obsluha poslepu. */
  decreaseLabel?: string
  increaseLabel?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Nominál — § Pokladna · platba.
 * Řádek počítání kasy: obsluha kliká plus a mínus a na peníze se dívá, ne na
 * obrazovku. Proto tlačítka 48 px a počet velkým písmem.
 */
export function DenominationRow({
  denomination,
  count,
  sum,
  onDecrease,
  onIncrease,
  onCountChange,
  countLabel,
  decreaseLabel = 'Ubrat',
  increaseLabel = 'Přidat',
  className,
  ...rest
}: DenominationRowProps) {
  return (
    <div className={['dg-denomination-row', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-denomination-row__note">{denomination}</span>
      {onDecrease ? (
        <button
          type="button"
          className="dg-denomination-row__step"
          onClick={onDecrease}
          aria-label={decreaseLabel}
        >
          −
        </button>
      ) : null}
      {onCountChange ? (
        <input
          className="dg-denomination-row__count dg-denomination-row__count--input"
          inputMode="numeric"
          value={String(count ?? '')}
          aria-label={countLabel}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => {
            const cislice = event.target.value.replace(/\D/g, '').slice(0, 4)
            onCountChange(cislice === '' ? 0 : Number(cislice))
          }}
        />
      ) : (
        <span className="dg-denomination-row__count">{count}</span>
      )}
      {onIncrease ? (
        <button
          type="button"
          className="dg-denomination-row__step"
          onClick={onIncrease}
          aria-label={increaseLabel}
        >
          +
        </button>
      ) : null}
      {sum != null ? <span className="dg-denomination-row__sum">{sum}</span> : null}
    </div>
  )
}

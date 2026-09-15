import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface LedgerLine {
  key: string
  /** Popis položky („Hotovostní prodeje“). */
  label: ReactNode
  /** Hodnota i se znaménkem („+ 24 362“). */
  value: ReactNode
}

export interface LedgerProps extends HTMLAttributes<HTMLDivElement> {
  /** Řádky rozpisu v pořadí návrhu. */
  lines: LedgerLine[]
  /** Popis součtu pod linkou („Očekáváno“). */
  totalLabel?: ReactNode
  /** Hodnota součtu. */
  totalValue?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Ledger / Rozpis — rozpis hotovosti nebo tržby se součtem pod linkou.
 * Součet je tučnější a větší; bez něj (totalLabel nevyplněn) je z toho jen výpis.
 */
export function Ledger({ lines, totalLabel, totalValue, className, ...rest }: LedgerProps) {
  return (
    <div className={['dg-ledger', className].filter(Boolean).join(' ')} {...rest}>
      {lines.map((line) => (
        <div key={line.key} className="dg-ledger__line">
          <span className="dg-ledger__label">{line.label}</span>
          <span className="dg-ledger__value">{line.value}</span>
        </div>
      ))}
      {totalLabel != null || totalValue != null ? (
        <>
          <span className="dg-ledger__rule" aria-hidden="true" />
          <div className="dg-ledger__total">
            <span className="dg-ledger__label">{totalLabel}</span>
            <span className="dg-ledger__value">{totalValue}</span>
          </div>
        </>
      ) : null}
    </div>
  )
}

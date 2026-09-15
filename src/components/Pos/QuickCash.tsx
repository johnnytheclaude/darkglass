import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface QuickCashOption {
  key: string
  /** Popisek na tlačítku („7 000 Kč“, „Přesně 6 872 Kč“). */
  label: ReactNode
  disabled?: boolean
}

export interface QuickCashProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Popisek nad nabídkou („Rychlé bankovky“). */
  label?: ReactNode
  options: QuickCashOption[]
  /** Klíč zvolené bankovky; `null` = obsluha píše částku na klávesnici. */
  selectedKey?: string | null
  onSelect?: (key: string) => void
  ref?: Ref<HTMLDivElement>
}

/**
 * Rychlé bankovky — § Pokladna · platba.
 * Nabídne částky, kterými zákazník nejčastěji platí, aby je obsluha nemusela
 * psát. Tlačítka mají 64 px kvůli trefení prstem.
 */
export function QuickCash({
  label,
  options,
  selectedKey = null,
  onSelect,
  className,
  ...rest
}: QuickCashProps) {
  return (
    <div className={['dg-quick-cash', className].filter(Boolean).join(' ')} {...rest}>
      {label != null ? <span className="dg-quick-cash__label">{label}</span> : null}
      {options.map((option) => {
        const selected = option.key === selectedKey

        return (
          <button
            key={option.key}
            type="button"
            className={['dg-quick-cash__option', selected ? 'is-selected' : null]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={selected}
            disabled={option.disabled}
            onClick={() => onSelect?.(option.key)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

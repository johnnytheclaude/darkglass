import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface SegmentedOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Volby zleva doprava; návrh počítá se dvěma až čtyřmi. */
  options: SegmentedOption[]
  value: string
  onChange?: (value: string) => void
  /** Přes celou šířku — volby se rozdělí rovným dílem. */
  block?: boolean
  /** Popis skupiny pro čtečku („Období“). */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Segmentovaný přepínač (Souhrn/Detail, Dnes/Týden/Měsíc…). Volby jsou
 * tlačítka, takže se dají procházet klávesnicí; vybraná nese `aria-pressed`.
 */
export function SegmentedControl({
  options,
  value,
  onChange,
  block = false,
  label,
  className,
  ...rest
}: SegmentedControlProps) {
  return (
    <div
      className={['dg-segmented', block ? 'dg-segmented--block' : null, className]
        .filter(Boolean)
        .join(' ')}
      role="group"
      aria-label={label}
      {...rest}
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            className={['dg-segmented__item', selected ? 'is-selected' : null]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={selected}
            disabled={option.disabled}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

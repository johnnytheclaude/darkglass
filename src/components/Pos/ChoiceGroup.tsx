import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ChoiceOption {
  value: string
  label: ReactNode
}

export interface ChoiceGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Volby v pořadí návrhu (5 %, 10 %, …, vlastní). */
  options: ChoiceOption[]
  /** Vybraná hodnota; null = nevybráno. */
  value?: string | null
  /** Volba klepnutím. */
  onChange?: (value: string) => void
  /** Popis skupiny pro čtečku („Sleva“). */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Volby / Skupina — rychlá volba z několika hodnot (sleva, důvod, počet).
 * Vybraná volba je kontrastní, ne jen jinak orámovaná — pozná se i z dálky.
 */
export function ChoiceGroup({
  options,
  value = null,
  onChange,
  label,
  className,
  ...rest
}: ChoiceGroupProps) {
  return (
    <div
      className={['dg-choice-group', className].filter(Boolean).join(' ')}
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
            className={['dg-choice-group__option', selected ? 'is-selected' : null]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={selected}
            onClick={onChange ? () => onChange(option.value) : undefined}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

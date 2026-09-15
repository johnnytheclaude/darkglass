import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DatePresetOption {
  /** Klíč volby — s ním se vrací výběr. */
  key: string
  label: ReactNode
}

export interface DatePresetsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: DatePresetOption[]
  value?: string | null
  onChange?: (key: string) => void
  ref?: Ref<HTMLDivElement>
}

/**
 * Date Presets — rychlé volby období (Dnes, Včera, Posledních 7 dní…).
 * Zvolená položka drží jemnou výplň, ne akcent: je to filtr, ne potvrzení.
 */
export function DatePresets({ options, value, onChange, className, ...rest }: DatePresetsProps) {
  const classes = ['dg-date-presets', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="listbox" {...rest}>
      {options.map((option) => {
        const selected = option.key === value
        return (
          <button
            key={option.key}
            type="button"
            role="option"
            aria-selected={selected}
            className={selected ? 'dg-date-presets__row dg-date-presets__row--on' : 'dg-date-presets__row'}
            onClick={onChange ? () => onChange(option.key) : undefined}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

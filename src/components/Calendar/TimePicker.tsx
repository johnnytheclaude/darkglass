import type { HTMLAttributes, Ref } from 'react'

export interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Časy k výběru, hotové na zobrazení („08:00"). Krok si volí aplikace. */
  options: string[]
  value?: string | null
  onChange?: (value: string) => void
  /** Čas, který nejde vybrat (obsazený termín, zavřeno). */
  disabledOption?: (value: string) => boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * Time Picker — svislý seznam časů. Vybraný čas je plný akcent; seznam se
 * posouvá v rodiči, komponenta sama nikam nepřetéká.
 */
export function TimePicker({
  options,
  value,
  onChange,
  disabledOption,
  className,
  ...rest
}: TimePickerProps) {
  const classes = ['dg-time-picker', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="listbox" {...rest}>
      {options.map((option) => {
        const selected = option === value
        return (
          <button
            key={option}
            type="button"
            role="option"
            aria-selected={selected}
            disabled={disabledOption ? disabledOption(option) : false}
            className={selected ? 'dg-time-picker__row dg-time-picker__row--on' : 'dg-time-picker__row'}
            onClick={onChange ? () => onChange(option) : undefined}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

import { useId, useState } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from './FieldShell'
import { FieldMenu } from './FieldMenu'
import type { FieldMenuOption } from './FieldMenu'
import { IconChevronDown } from '../Icons/IconChevronDown'

export interface SelectFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'defaultValue'> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  error?: ReactNode
  disabled?: boolean
  options: FieldMenuOption[]
  /** Vybraná hodnota; bez ní se ukáže `placeholder`. */
  value?: string
  placeholder?: ReactNode
  onValueChange?: (value: string) => void
  /** Rozbalení zvenčí (ukázka, řízený formulář). Bez něj si ho drží sama. */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  ref?: Ref<HTMLDivElement>
}

/**
 * Rozbalovací výběr — zavřený je to pole se šipkou, rozbalený má pod sebou
 * nabídku. Nabídka je v toku dokumentu (ne v portálu), takže v ukázce i ve
 * formuláři sedí přesně pod polem a nikam neuteče při odrolování.
 */
export function SelectField({
  label,
  required,
  help,
  error,
  disabled = false,
  options,
  value,
  placeholder = 'Vyberte…',
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  ...rest
}: SelectFieldProps) {
  const [ownOpen, setOwnOpen] = useState(defaultOpen)
  const isOpen = open ?? ownOpen
  const buttonId = useId()
  const selected = options.find((option) => option.value === value)

  const setOpen = (next: boolean) => {
    if (open === undefined) setOwnOpen(next)
    onOpenChange?.(next)
  }

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      htmlFor={buttonId}
      className={['dg-select', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <button
        type="button"
        id={buttonId}
        className={[
          'dg-field__box',
          'dg-select__box',
          error != null ? 'dg-field__box--error' : null,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        <span className={selected ? 'dg-select__value' : 'dg-select__value is-placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="dg-field__trailing" aria-hidden="true">
          <IconChevronDown size={18} />
        </span>
      </button>
      {isOpen ? (
        <FieldMenu
          options={options}
          value={value}
          aria-labelledby={buttonId}
          onSelect={(next) => {
            onValueChange?.(next)
            setOpen(false)
          }}
        />
      ) : null}
    </FieldShell>
  )
}

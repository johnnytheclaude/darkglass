import { useState } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from '../Fields/FieldShell'
import { FieldMenu } from '../Fields/FieldMenu'
import type { FieldMenuOption } from '../Fields/FieldMenu'
import { IconChevronDown } from '../Icons/IconChevronDown'
import { IconX } from '../Icons/IconX'

export interface MultiSelectFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  error?: ReactNode
  disabled?: boolean
  options: FieldMenuOption[]
  /** Vybrané hodnoty; pořadí si drží aplikace. */
  values: string[]
  onValuesChange?: (values: string[]) => void
  placeholder?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Popisek křížku u štítku pro čtečku; `%s` nahradí text štítku. */
  removeLabel?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Vícenásobný výběr — vybrané hodnoty jsou štítky v poli, každý se dá shodit
 * křížkem. Štítky se zalamují do dalšího řádku, pole se natáhne; nikdy
 * nepřetečou ven z formuláře.
 */
export function MultiSelectField({
  label,
  required,
  help,
  error,
  disabled = false,
  options,
  values,
  onValuesChange,
  placeholder = 'Vyberte…',
  open,
  defaultOpen = false,
  onOpenChange,
  removeLabel = 'Odebrat %s',
  className,
  ...rest
}: MultiSelectFieldProps) {
  const [ownOpen, setOwnOpen] = useState(defaultOpen)
  const isOpen = open ?? ownOpen

  const setOpen = (next: boolean) => {
    if (open === undefined) setOwnOpen(next)
    onOpenChange?.(next)
  }

  const labelOf = (value: string) => options.find((option) => option.value === value)?.label ?? value

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      className={['dg-multiselect', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div
        className={[
          'dg-field__box',
          'dg-multiselect__box',
          error != null ? 'dg-field__box--error' : null,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {values.length === 0 ? <span className="dg-multiselect__placeholder">{placeholder}</span> : null}
        {values.map((value) => (
          <span key={value} className="dg-multiselect__token">
            <span className="dg-multiselect__token-label">{labelOf(value)}</span>
            <button
              type="button"
              className="dg-multiselect__remove"
              disabled={disabled}
              aria-label={removeLabel.replace('%s', String(labelOf(value)))}
              onClick={() => onValuesChange?.(values.filter((item) => item !== value))}
            >
              <IconX size={11} />
            </button>
          </span>
        ))}
        <button
          type="button"
          className="dg-multiselect__caret"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Zavřít nabídku' : 'Otevřít nabídku'}
          onClick={() => setOpen(!isOpen)}
        >
          <IconChevronDown size={17} />
        </button>
      </div>
      {isOpen ? (
        <FieldMenu
          options={options}
          value={values}
          onSelect={(next) =>
            onValuesChange?.(
              values.includes(next) ? values.filter((item) => item !== next) : [...values, next],
            )
          }
        />
      ) : null}
    </FieldShell>
  )
}

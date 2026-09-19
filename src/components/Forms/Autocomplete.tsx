import { useId, useRef } from 'react'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from '../Fields/FieldShell'
import { FieldMenuLayer } from '../Fields/FieldMenuLayer'
import type { FieldMenuOption } from '../Fields/FieldMenu'
import { IconSearch } from '../Icons/IconSearch'

export interface AutocompleteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSelect'> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  error?: ReactNode
  /** Návrhy k rozepsanému textu; filtruje je aplikace, ne knihovna. */
  options: FieldMenuOption[]
  /** Nabídka je vidět, jen když je co nabídnout a pole je rozepsané. */
  open?: boolean
  /** Řádek nad návrhy; výchozí je počet návrhů. */
  hint?: ReactNode
  /** Návrh pod klávesnicí (šipky) — jen podbarvení. */
  activeValue?: string
  onSelectOption?: (value: string) => void
  icon?: ReactNode
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Našeptávač nad katalogem — pole s lupou a nabídkou návrhů pod ním.
 * Hledání i filtrování dělá aplikace; knihovna jen ukazuje, co dostane.
 */
export function Autocomplete({
  label,
  required,
  help,
  error,
  options,
  open = false,
  hint,
  activeValue,
  onSelectOption,
  icon,
  wrapperClassName,
  className,
  disabled,
  id,
  ...rest
}: AutocompleteProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const count = options.length
  /** Rám pole; nabídka návrhů se podle něj měří (task #845). */
  const boxRef = useRef<HTMLDivElement>(null)

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      htmlFor={inputId}
      className={['dg-autocomplete', wrapperClassName].filter(Boolean).join(' ')}
    >
      <div
        ref={boxRef}
        className={['dg-field__box', error != null ? 'dg-field__box--error' : null]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="dg-field__icon" aria-hidden="true">
          {icon ?? <IconSearch size={17} />}
        </span>
        <input
          id={inputId}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={open}
          aria-autocomplete="list"
          className={['dg-textfield__input', className].filter(Boolean).join(' ')}
          disabled={disabled}
          {...rest}
        />
      </div>
      {open && count > 0 ? (
        <FieldMenuLayer
          anchorRef={boxRef}
          className="dg-fieldmenu--autocomplete"
          options={options}
          activeValue={activeValue}
          hint={hint ?? `${count} ${count === 1 ? 'návrh' : count < 5 ? 'návrhy' : 'návrhů'}`}
          onSelect={(value) => onSelectOption?.(value)}
        />
      ) : null}
    </FieldShell>
  )
}

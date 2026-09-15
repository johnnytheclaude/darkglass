import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconCheck } from '../Icons/IconCheck'

export interface FieldMenuOption {
  value: string
  label: ReactNode
  /** Miniatura zboží před popiskem (našeptávač nad katalogem). */
  thumb?: ReactNode
  disabled?: boolean
}

export interface FieldMenuProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  options: FieldMenuOption[]
  /** Vybraná hodnota (nebo hodnoty u vícenásobného výběru) — dostane fajfku. */
  value?: string | string[]
  /** Položka pod kurzorem/klávesnicí; jen podbarvení, ne výběr. */
  activeValue?: string
  /** Řádek nad nabídkou („3 NÁVRHY“). */
  hint?: ReactNode
  onSelect?: (value: string) => void
  ref?: Ref<HTMLUListElement>
}

/**
 * Rozbalená nabídka pole — sdílí ji rozbalovací výběr, vícenásobný výběr
 * i našeptávač, aby měly stejný stín, rádius i výšku řádku. Z balíku se
 * neexportuje; komponenta si ji vykresluje sama.
 */
export function FieldMenu({
  options,
  value,
  activeValue,
  hint,
  onSelect,
  className,
  ...rest
}: FieldMenuProps) {
  const selected = Array.isArray(value) ? value : value != null ? [value] : []

  return (
    <ul className={['dg-fieldmenu', className].filter(Boolean).join(' ')} role="listbox" {...rest}>
      {hint != null ? (
        <li className="dg-fieldmenu__hint" role="presentation">
          {hint}
        </li>
      ) : null}
      {options.map((option) => {
        const isSelected = selected.includes(option.value)
        const classes = [
          'dg-fieldmenu__opt',
          isSelected ? 'is-selected' : null,
          option.value === activeValue ? 'is-active' : null,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <li key={option.value} role="option" aria-selected={isSelected}>
            <button
              type="button"
              className={classes}
              disabled={option.disabled}
              onClick={() => onSelect?.(option.value)}
            >
              {option.thumb != null ? (
                <span className="dg-fieldmenu__thumb" aria-hidden="true">
                  {option.thumb}
                </span>
              ) : null}
              <span className="dg-fieldmenu__label">{option.label}</span>
              {isSelected ? <IconCheck size={16} className="dg-fieldmenu__check" /> : null}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

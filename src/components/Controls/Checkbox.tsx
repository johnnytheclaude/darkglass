import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { IconCheck } from '../Icons/IconCheck'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  /** Třída obalu; `className` míří na samotný `input`. */
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Zaškrtávátko — stavy nezaškrtnuto / zaškrtnuto / neaktivní podle návrhu.
 * Pod čtvercem je skutečný `input[type=checkbox]`, takže prvek umí klávesnici,
 * formulář i čtečku; celý řádek včetně popisku je klikací (kořen je `label`).
 */
export function Checkbox({
  label,
  wrapperClassName,
  className,
  disabled,
  style,
  ...rest
}: CheckboxProps) {
  return (
    <label
      className={['dg-check', disabled ? 'is-disabled' : null, wrapperClassName]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <input
        type="checkbox"
        className={['dg-check__input', className].filter(Boolean).join(' ')}
        disabled={disabled}
        {...rest}
      />
      <span className="dg-check__box" aria-hidden="true">
        <IconCheck size={15} />
      </span>
      {label != null ? <span className="dg-check__label">{label}</span> : null}
    </label>
  )
}

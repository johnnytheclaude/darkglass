import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  /** Třída obalu; `className` míří na samotný `input`. */
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Vypínač (zapnuto / vypnuto / neaktivní). Uvnitř je `input[type=checkbox]`
 * s `role="switch"`, takže ho čtečka hlásí jako vypínač, ne jako zaškrtávátko.
 */
export function Switch({
  label,
  wrapperClassName,
  className,
  disabled,
  style,
  ...rest
}: SwitchProps) {
  return (
    <label
      className={['dg-switch', disabled ? 'is-disabled' : null, wrapperClassName]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <input
        type="checkbox"
        role="switch"
        className={['dg-switch__input', className].filter(Boolean).join(' ')}
        disabled={disabled}
        {...rest}
      />
      <span className="dg-switch__track" aria-hidden="true">
        <span className="dg-switch__knob" />
      </span>
      {label != null ? <span className="dg-switch__label">{label}</span> : null}
    </label>
  )
}

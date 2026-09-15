import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  /** Třída obalu; `className` míří na samotný `input`. */
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Přepínač jedné volby ze skupiny (`name` je společné). Zapnutá volba se
 * pozná barvou i tečkou uvnitř kolečka — návrh má u obou stavů stejné
 * kolečko, což by rozdíl nechalo jen na barvě; to pravidlo sekce zakazuje.
 */
export function Radio({
  label,
  wrapperClassName,
  className,
  disabled,
  style,
  ...rest
}: RadioProps) {
  return (
    <label
      className={['dg-radio', disabled ? 'is-disabled' : null, wrapperClassName]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <input
        type="radio"
        className={['dg-radio__input', className].filter(Boolean).join(' ')}
        disabled={disabled}
        {...rest}
      />
      <span className="dg-radio__box" aria-hidden="true">
        <span className="dg-radio__dot" />
      </span>
      {label != null ? <span className="dg-radio__label">{label}</span> : null}
    </label>
  )
}

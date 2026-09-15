import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from './FieldShell'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  /** Text chyby; pole zároveň dostane červený rámeček a `aria-invalid`. */
  error?: ReactNode
  /** Ikona před hodnotou (lupa, kalendář). */
  icon?: ReactNode
  /** Jednotka za hodnotou („Kč“, „ks“) — text, ne ovládací prvek. */
  suffix?: ReactNode
  /** Ikona vpravo (šipka výběru, kalendář u data). */
  trailing?: ReactNode
  /** Třída obalu; `className` míří na samotný `input`. */
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Textové pole se vším, co návrh rozlišuje jako stav: prázdné, vyplněné,
 * zaostřené (kroužek řeší CSS), chyba, neaktivní, s ikonou, s jednotkou
 * a s nápovědou. Datum i rozbalovací pole jsou tatáž komponenta s ikonou.
 */
export function TextField({
  label,
  required,
  help,
  error,
  icon,
  suffix,
  trailing,
  wrapperClassName,
  className,
  disabled,
  id,
  style,
  ...rest
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      htmlFor={inputId}
      className={wrapperClassName}
      style={style}
    >
      <div
        className={['dg-field__box', error != null ? 'dg-field__box--error' : null]
          .filter(Boolean)
          .join(' ')}
      >
        {icon ? (
          <span className="dg-field__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={['dg-textfield__input', className].filter(Boolean).join(' ')}
          disabled={disabled}
          aria-invalid={error != null ? true : undefined}
          {...rest}
        />
        {suffix != null ? <span className="dg-textfield__suffix">{suffix}</span> : null}
        {trailing ? (
          <span className="dg-field__trailing" aria-hidden="true">
            {trailing}
          </span>
        ) : null}
      </div>
    </FieldShell>
  )
}

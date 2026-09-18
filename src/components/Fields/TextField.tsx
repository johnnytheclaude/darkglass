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
 *
 * `type` má výchozí hodnotu `text` schválně: holý `<input>` bez atributu
 * `type` nechytí žádný selektor `input[type=…]`, takže v hostitelské aplikaci
 * propadne na vzhled prohlížeče (v tmavém motivu šedé pole výšky 21 px).
 * Rámeček a výplň kreslí knihovna, ale atribut musí být vidět i v DOM.
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
  type = 'text',
  ...rest
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const note = error ?? help
  const noteId = note != null ? `${inputId}-note` : undefined

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      htmlFor={inputId}
      noteId={noteId}
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
          type={type}
          className={['dg-textfield__input', className].filter(Boolean).join(' ')}
          disabled={disabled}
          required={required}
          aria-invalid={error != null ? true : undefined}
          aria-describedby={noteId}
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

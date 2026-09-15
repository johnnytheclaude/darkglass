import { useId } from 'react'
import type { ReactNode, Ref, TextareaHTMLAttributes } from 'react'
import { FieldShell } from './FieldShell'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode
  required?: boolean
  help?: ReactNode
  error?: ReactNode
  /** Třída obalu; `className` míří na samotný `textarea`. */
  wrapperClassName?: string
  ref?: Ref<HTMLTextAreaElement>
}

/**
 * Víceřádkové pole (poznámka u dokladu, důvod odpisu). Návrhová výška je 110 px
 * a dá se táhnout jen svisle — vodorovné tažení by rozbilo formulář.
 */
export function TextArea({
  label,
  required,
  help,
  error,
  wrapperClassName,
  className,
  disabled,
  id,
  rows = 3,
  style,
  ...rest
}: TextAreaProps) {
  const autoId = useId()
  const fieldId = id ?? autoId

  return (
    <FieldShell
      label={label}
      required={required}
      help={help}
      error={error}
      disabled={disabled}
      htmlFor={fieldId}
      className={wrapperClassName}
      style={style}
    >
      <div
        className={[
          'dg-field__box',
          'dg-textarea__box',
          error != null ? 'dg-field__box--error' : null,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <textarea
          id={fieldId}
          rows={rows}
          className={['dg-textarea__input', className].filter(Boolean).join(' ')}
          disabled={disabled}
          aria-invalid={error != null ? true : undefined}
          {...rest}
        />
      </div>
    </FieldShell>
  )
}

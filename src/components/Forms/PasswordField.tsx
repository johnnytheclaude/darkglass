import { useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from '../Fields/FieldShell'
import { IconEye } from '../Icons/IconEye'

export interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  required?: boolean
  error?: ReactNode
  /** Síla hesla 0–4; 0 ukazatel schová. Počítá ji aplikace, ne knihovna. */
  strength?: number
  /** Věta k síle („Silné heslo“) — obarví se stejně jako ukazatel. */
  strengthLabel?: ReactNode
  help?: ReactNode
  /** Popisky oka pro čtečku. */
  showLabel?: string
  hideLabel?: string
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

const SEGMENTS = 4

/** 1 slabé, 2 průměrné, 3–4 silné — stejné ladění jako u stavových barev. */
function toneOf(strength: number) {
  if (strength <= 1) return 'danger'
  if (strength === 2) return 'warning'
  return 'success'
}

/**
 * Pole pro heslo — oko pro zobrazení a ukazatel síly. Sílu si počítá aplikace
 * (knihovna nezná pravidla firmy) a pošle ji sem jako číslo 0–4.
 */
export function PasswordField({
  label,
  required,
  error,
  strength = 0,
  strengthLabel,
  help,
  showLabel = 'Zobrazit heslo',
  hideLabel = 'Skrýt heslo',
  wrapperClassName,
  className,
  disabled,
  id,
  ...rest
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const autoId = useId()
  const inputId = id ?? autoId
  const tone = toneOf(strength)

  return (
    <FieldShell
      label={label}
      required={required}
      error={error}
      help={help}
      disabled={disabled}
      htmlFor={inputId}
      className={['dg-password', wrapperClassName].filter(Boolean).join(' ')}
    >
      <div
        className={['dg-field__box', error != null ? 'dg-field__box--error' : null]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          className={['dg-textfield__input', 'dg-password__input', className]
            .filter(Boolean)
            .join(' ')}
          disabled={disabled}
          aria-invalid={error != null ? true : undefined}
          {...rest}
        />
        <button
          type="button"
          className="dg-password__eye"
          disabled={disabled}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          onClick={() => setVisible((prev) => !prev)}
        >
          <IconEye size={18} off={visible} />
        </button>
      </div>
      {strength > 0 ? (
        <div className={`dg-password__meter dg-password__meter--${tone}`}>
          <div
            className="dg-password__segments"
            role="meter"
            aria-valuemin={0}
            aria-valuemax={SEGMENTS}
            aria-valuenow={strength}
            aria-label="Síla hesla"
          >
            {Array.from({ length: SEGMENTS }, (_, index) => (
              <span
                key={index}
                className={
                  index < strength ? 'dg-password__seg is-filled' : 'dg-password__seg'
                }
              />
            ))}
          </div>
          {strengthLabel != null ? (
            <span className="dg-password__strength">{strengthLabel}</span>
          ) : null}
        </div>
      ) : null}
    </FieldShell>
  )
}

import { Fragment, useId, useRef } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from '../Fields/FieldShell'

export interface OtpFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: ReactNode
  help?: ReactNode
  error?: ReactNode
  disabled?: boolean
  /** Kolik políček kód má; návrh ukazuje šest. */
  length?: number
  /**
   * Z čeho se kód skládá. `digits` je ověřovací kód z SMS podle návrhu,
   * `alnum` je kód s písmeny (párovací kód pokladny `ABCD-2345`) — píše se
   * velkými písmeny a číslicemi.
   */
  alphabet?: 'digits' | 'alnum'
  /** Za kolikátým políčkem stojí oddělovač `–`; bez něj se nekreslí. */
  separatorAfter?: number
  /** Zadané číslice jako řetězec — kratší než `length` znamená rozepsaný kód. */
  value: string
  onChange?: (value: string) => void
  ref?: Ref<HTMLDivElement>
}

/**
 * Ověřovací kód z SMS — jedno políčko na číslici. Píše se plynule (po zadání
 * skočí kurzor dál, Backspace se vrací) a vložení celého kódu přes schránku
 * rozepíše číslice samo.
 */
export function OtpField({
  label,
  help,
  error,
  disabled = false,
  length = 6,
  alphabet = 'digits',
  separatorAfter,
  value,
  onChange,
  className,
  ...rest
}: OtpFieldProps) {
  const boxes = useRef<(HTMLInputElement | null)[]>([])
  const autoId = useId()
  const labelId = label != null ? `${autoId}-label` : undefined
  const note = error ?? help
  const noteId = note != null ? `${autoId}-note` : undefined

  /** Mezera uvnitř hodnoty je prázdné políčko, ne znak k zobrazení. */
  const cislice = (index: number) => {
    const znak = value[index]
    return znak && znak !== ' ' ? znak : ''
  }

  const write = (index: number, digits: string) => {
    const clean = digits.replace(alphabet === 'alnum' ? /[^0-9A-Za-z]/g : /\D/g, '')
    const psane = alphabet === 'alnum' ? clean.toUpperCase() : clean
    const next = value.padEnd(length, ' ').split('')
    // Prázdný vstup = smazání číslice (Backspace nad vyplněným políčkem);
    // bez tohohle nešel kód opravit jinak než přepsáním.
    if (!psane) {
      next[index] = ' '
      onChange?.(next.join('').trimEnd())
      return
    }
    for (let i = 0; i < psane.length && index + i < length; i += 1) {
      next[index + i] = psane[i]
    }
    onChange?.(next.join('').trimEnd())
    const focus = Math.min(index + psane.length, length - 1)
    boxes.current[focus]?.focus()
  }

  return (
    <FieldShell
      label={label}
      help={help}
      error={error}
      disabled={disabled}
      labelId={labelId}
      noteId={noteId}
      className={['dg-otp', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* Skupina drží popisek i hlášku nad všemi políčky — čtečka obrazovky
          jinak u každé číslice zvlášť neřekne, o jaký kód jde. */}
      <div
        className="dg-otp__boxes"
        role="group"
        aria-labelledby={labelId}
        aria-describedby={noteId}
      >
        {Array.from({ length }, (_, index) => (
          <Fragment key={index}>
          <input
            ref={(node) => {
              boxes.current[index] = node
            }}
            className="dg-otp__digit"
            type="text"
            inputMode={alphabet === 'alnum' ? 'text' : 'numeric'}
            autoComplete={alphabet === 'alnum' ? 'off' : 'one-time-code'}
            autoCapitalize={alphabet === 'alnum' ? 'characters' : undefined}
            spellCheck={alphabet === 'alnum' ? false : undefined}
            maxLength={1}
            disabled={disabled}
            aria-label={`${index + 1}. ${alphabet === 'alnum' ? 'znak' : 'číslice'} kódu`}
            aria-invalid={error != null ? true : undefined}
            value={cislice(index)}
            onChange={(event) => write(index, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Backspace' && !cislice(index)) {
                boxes.current[Math.max(0, index - 1)]?.focus()
              }
              if (event.key === 'ArrowLeft') boxes.current[Math.max(0, index - 1)]?.focus()
              if (event.key === 'ArrowRight') {
                boxes.current[Math.min(length - 1, index + 1)]?.focus()
              }
            }}
            onPaste={(event) => {
              event.preventDefault()
              write(index, event.clipboardData.getData('text'))
            }}
          />
            {separatorAfter === index + 1 ? (
              <span className="dg-otp__separator" aria-hidden="true">
                –
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
    </FieldShell>
  )
}

import { useRef } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from '../Fields/FieldShell'

export interface OtpFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: ReactNode
  help?: ReactNode
  error?: ReactNode
  disabled?: boolean
  /** Kolik číslic kód má; návrh ukazuje šest. */
  length?: number
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
  value,
  onChange,
  className,
  ...rest
}: OtpFieldProps) {
  const boxes = useRef<(HTMLInputElement | null)[]>([])

  const write = (index: number, digits: string) => {
    const clean = digits.replace(/\D/g, '')
    if (!clean) return
    const next = value.padEnd(length, ' ').split('')
    for (let i = 0; i < clean.length && index + i < length; i += 1) {
      next[index + i] = clean[i]
    }
    onChange?.(next.join('').trimEnd())
    const focus = Math.min(index + clean.length, length - 1)
    boxes.current[focus]?.focus()
  }

  return (
    <FieldShell
      label={label}
      help={help}
      error={error}
      disabled={disabled}
      className={['dg-otp', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className="dg-otp__boxes">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(node) => {
              boxes.current[index] = node
            }}
            className="dg-otp__digit"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            disabled={disabled}
            aria-label={`${index + 1}. číslice kódu`}
            aria-invalid={error != null ? true : undefined}
            value={value[index] ?? ''}
            onChange={(event) => write(index, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Backspace' && !value[index]) {
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
        ))}
      </div>
    </FieldShell>
  )
}

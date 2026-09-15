import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { FieldShell } from './FieldShell'
import { IconMinus } from '../Icons/IconMinus'
import { IconPlus } from '../Icons/IconPlus'

export interface NumberStepperProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  label?: ReactNode
  help?: ReactNode
  error?: ReactNode
  /** Řízená hodnota — počet kusů. */
  value: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  /** Popisky tlačítek pro čtečku; text na nich není. */
  decreaseLabel?: string
  increaseLabel?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Počítadlo kusů — dotykové cíle 40 px podle návrhu, takže se trefí prstem.
 * Hodnota je jen ke čtení: zadává se tlačítky, aby na dotyku nevyskakovala
 * klávesnice přes rozdělaný účet.
 */
export function NumberStepper({
  label,
  help,
  error,
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  disabled = false,
  decreaseLabel = 'O jedna míň',
  increaseLabel = 'O jedna víc',
  className,
  ...rest
}: NumberStepperProps) {
  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next))
    if (clamped !== value) onChange?.(clamped)
  }

  return (
    <FieldShell
      label={label}
      help={help}
      error={error}
      disabled={disabled}
      className={['dg-stepper', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className="dg-field__box dg-stepper__box">
        <button
          type="button"
          className="dg-stepper__btn"
          onClick={() => set(value - step)}
          disabled={disabled || value <= min}
          aria-label={decreaseLabel}
        >
          <IconMinus size={18} />
        </button>
        <output className="dg-stepper__value">{value}</output>
        <button
          type="button"
          className="dg-stepper__btn"
          onClick={() => set(value + step)}
          disabled={disabled || value >= max}
          aria-label={increaseLabel}
        >
          <IconPlus size={18} />
        </button>
      </div>
    </FieldShell>
  )
}

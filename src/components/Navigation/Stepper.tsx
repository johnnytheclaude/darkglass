import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconCheck } from '../Icons/IconCheck'

export interface StepperStep {
  key: string
  label: ReactNode
}

export interface StepperProps extends HTMLAttributes<HTMLElement> {
  steps: StepperStep[]
  /** Index kroku, ve kterém průvodce stojí (0 = první). Předchozí jsou hotové. */
  current: number
  /** Klik na hotový krok — zpět do něj. Bez toho jsou kroky jen popis stavu. */
  onStepSelect?: (key: string, index: number) => void
  label?: string
  ref?: Ref<HTMLElement>
}

/**
 * Nav / Průvodce · kroky — § Navigace. Hotové kroky nesou fajfku na akcentu,
 * současný číslo na ztlumeném akcentu, zbývající číslo na podkladu.
 */
export function Stepper({
  steps,
  current,
  onStepSelect,
  label = 'Kroky průvodce',
  className,
  ...rest
}: StepperProps) {
  return (
    <nav
      className={['dg-stepper', className].filter(Boolean).join(' ')}
      aria-label={label}
      {...rest}
    >
      <ol className="dg-stepper__list">
        {steps.map((step, i) => {
          const done = i < current
          const active = i === current
          const stav = done ? 'is-done' : active ? 'is-current' : 'is-todo'
          const clickable = done && onStepSelect != null

          return (
            <li key={step.key} className={['dg-stepper__step', stav].join(' ')}>
              {i > 0 ? <span className="dg-stepper__line" aria-hidden="true" /> : null}
              {clickable ? (
                <button
                  type="button"
                  className="dg-stepper__body"
                  onClick={() => onStepSelect?.(step.key, i)}
                >
                  <span className="dg-stepper__circle" aria-hidden="true">
                    <IconCheck size={16} />
                  </span>
                  <span className="dg-stepper__label">{step.label}</span>
                </button>
              ) : (
                <span className="dg-stepper__body" aria-current={active ? 'step' : undefined}>
                  <span className="dg-stepper__circle" aria-hidden="true">
                    {done ? <IconCheck size={16} /> : i + 1}
                  </span>
                  <span className="dg-stepper__label">{step.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface StepsCompactStep {
  key: string
  label: ReactNode
}

export interface StepsCompactProps extends HTMLAttributes<HTMLOListElement> {
  /** Kroky procesu v pořadí (vratka, uzávěrka, naskladnění…). */
  steps: StepsCompactStep[]
  /** Index právě probíhajícího kroku (od nuly). */
  current: number
  ref?: Ref<HTMLOListElement>
}

/**
 * Nav / Steps Compact — kroky procesu na jednom řádku nad obsahem.
 * Proti Stepperu z § Navigace nemá spojnice ani popisy; hodí se nad obrazovku
 * Pokladny, kde je místo jen na jednu lištu.
 */
export function StepsCompact({ steps, current, className, ...rest }: StepsCompactProps) {
  return (
    <ol className={['dg-steps-compact', className].filter(Boolean).join(' ')} {...rest}>
      {steps.map((step, index) => {
        const state = index < current ? 'is-done' : index === current ? 'is-current' : 'is-todo'
        return (
          <li key={step.key} className={`dg-steps-compact__step ${state}`}>
            <span className="dg-steps-compact__circle" aria-hidden="true">
              {index + 1}
            </span>
            <span className="dg-steps-compact__label">{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}

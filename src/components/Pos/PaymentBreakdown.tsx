import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type PaymentBreakdownTone = 'default' | 'success' | 'warning' | 'danger'

export interface PaymentBreakdownLine {
  key: string
  label: ReactNode
  value: ReactNode
  /** `success` = část účtu je už zaplacená (schválená platba kartou). */
  tone?: PaymentBreakdownTone
  /** Zvýrazněný popisek — v návrhu ho má řádek „Zbývá zaplatit“. */
  strong?: boolean
}

export interface PaymentBreakdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek nad celkovou částkou („K zaplacení“). */
  label?: ReactNode
  /** Celková částka účtu. */
  total: ReactNode
  /** Rozpad platby: zaplacené části, zaokrouhlení, zbytek k doplacení. */
  lines?: PaymentBreakdownLine[]
  ref?: Ref<HTMLDivElement>
}

/**
 * Rozpis platby — § Pokladna · platba.
 * Podklad pro kombinovanou platbu: nad čarou celková částka, pod ní co už je
 * zaplacené (zeleně) a kolik ještě zbývá. Částky se nezalamují.
 */
export function PaymentBreakdown({
  label,
  total,
  lines = [],
  className,
  children,
  ...rest
}: PaymentBreakdownProps) {
  return (
    <div className={['dg-payment-breakdown', className].filter(Boolean).join(' ')} {...rest}>
      {label != null ? <span className="dg-payment-breakdown__label">{label}</span> : null}
      <span className="dg-payment-breakdown__total">{total}</span>
      {lines.map((line) => (
        <div
          key={line.key}
          className={[
            'dg-payment-breakdown__line',
            line.tone && line.tone !== 'default' ? `dg-payment-breakdown__line--${line.tone}` : null,
            line.strong ? 'is-strong' : null,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="dg-payment-breakdown__line-label">{line.label}</span>
          <span className="dg-payment-breakdown__line-value">{line.value}</span>
        </div>
      ))}
      {children}
    </div>
  )
}

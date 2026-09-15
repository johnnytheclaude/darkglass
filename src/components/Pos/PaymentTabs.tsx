import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface PaymentTab {
  key: string
  label: ReactNode
  /** Nedostupný způsob platby (vypnutý modul, offline) — návrh ho ztlumí. */
  disabled?: boolean
}

export interface PaymentTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: PaymentTab[]
  /** Klíč vybraného způsobu platby. */
  value?: string
  onChange?: (key: string) => void
  /** Popis skupiny pro čtečku. */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Způsoby platby — § Pokladna · platba.
 * Záložky mají 72 px, aby se daly trefit prstem, a dělí si šířku rovným dílem.
 */
export function PaymentTabs({
  tabs,
  value,
  onChange,
  label = 'Způsob platby',
  className,
  ...rest
}: PaymentTabsProps) {
  return (
    <div
      className={['dg-payment-tabs', className].filter(Boolean).join(' ')}
      role="tablist"
      aria-label={label}
      {...rest}
    >
      {tabs.map((tab) => {
        const selected = tab.key === value

        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            className={['dg-payment-tabs__tab', selected ? 'is-selected' : null]
              .filter(Boolean)
              .join(' ')}
            aria-selected={selected}
            disabled={tab.disabled}
            onClick={() => onChange?.(tab.key)}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

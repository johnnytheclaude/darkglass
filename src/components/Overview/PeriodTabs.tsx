import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface PeriodTab {
  key: string
  label: ReactNode
}

export interface PeriodTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: PeriodTab[]
  value?: string
  onChange?: (key: string) => void
  /**
   * Velikost záložky. `m` (výchozí) je 38 px z návrhu. `touch` zvedne
   * záložku na 44 px — přepínač období na telefonu se mačká prstem, ne myší.
   */
  size?: 'm' | 'touch'
  ref?: Ref<HTMLDivElement>
}

/**
 * Období (Tab / Vše) — přepínač období pod grafem. Aktivní záložka je plná
 * v kontrastní barvě; skupina se v úzkém místě zalomí, nikdy nepřeteče.
 */
export function PeriodTabs({ tabs, value, onChange, size = 'm', className, ...rest }: PeriodTabsProps) {
  const classes = ['dg-period-tabs', size === 'touch' && 'dg-period-tabs--touch', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="tablist" {...rest}>
      {tabs.map((tab) => {
        const active = tab.key === value
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            className={active ? 'dg-period-tabs__tab dg-period-tabs__tab--on' : 'dg-period-tabs__tab'}
            onClick={onChange ? () => onChange(tab.key) : undefined}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

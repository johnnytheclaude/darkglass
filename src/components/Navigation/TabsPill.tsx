import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface TabsPillItem {
  key: string
  label: ReactNode
  /** Počet v kolečku za popiskem. */
  count?: ReactNode
  disabled?: boolean
}

export interface TabsPillProps extends HTMLAttributes<HTMLDivElement> {
  items: TabsPillItem[]
  /** Klíč vybrané záložky (řízená komponenta). */
  value: string
  onValueChange?: (key: string) => void
  /** Popis skupiny pro čtečku. */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Záložky · pilulky — § Navigace · rozšíření. Přepínač pohledů na jednom
 * seznamu; vybraná záložka je plná, ostatní jen text s počtem.
 */
export function TabsPill({
  items,
  value,
  onValueChange,
  label,
  className,
  ...rest
}: TabsPillProps) {
  const classes = ['dg-tabs-pill', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="tablist" aria-label={label} {...rest}>
      {items.map((item) => {
        const selected = item.key === value
        return (
          <button
            className={selected ? 'dg-tabs-pill__tab is-selected' : 'dg-tabs-pill__tab'}
            key={item.key}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={item.disabled}
            onClick={() => onValueChange?.(item.key)}
          >
            <span className="dg-tabs-pill__label">{item.label}</span>
            {item.count != null ? (
              <span className="dg-tabs-pill__count">{item.count}</span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

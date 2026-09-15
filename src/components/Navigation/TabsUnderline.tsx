import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface TabsUnderlineTab {
  key: string
  label: ReactNode
}

export interface TabsUnderlineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabsUnderlineTab[]
  /** Klíč vybrané záložky — komponenta je řízená. */
  value: string
  onChange?: (key: string) => void
  label?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Nav / Záložky s podtržením — § Navigace. Přepínají obsah uvnitř jedné
 * obrazovky (šarže, pohyby, štítky), nikdy mezi obrazovkami aplikace.
 */
export function TabsUnderline({
  tabs,
  value,
  onChange,
  label = 'Záložky',
  className,
  ...rest
}: TabsUnderlineProps) {
  return (
    <div
      className={['dg-tabs-underline', className].filter(Boolean).join(' ')}
      role="tablist"
      aria-label={label}
      {...rest}
    >
      {tabs.map((tab) => {
        const active = tab.key === value
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            className={['dg-tabs-underline__tab', active ? 'is-active' : null]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange?.(tab.key)}
          >
            <span className="dg-tabs-underline__label">{tab.label}</span>
            <span className="dg-tabs-underline__rule" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

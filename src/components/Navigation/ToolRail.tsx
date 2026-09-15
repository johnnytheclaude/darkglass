import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ToolRailItem {
  /** Stabilní klíč nástroje (`novy`, `hledat`, `upozorneni`…). */
  key: string
  label: ReactNode
  icon?: ReactNode
  /** Hlavní akce panelu — jediná barevná (Nový). */
  primary?: boolean
  /** Odznak nepřečteného — červená tečka nad tlačítkem. */
  badge?: boolean
  onClick?: () => void
}

export interface ToolRailProps extends HTMLAttributes<HTMLElement> {
  items: ToolRailItem[]
  /** Nástroj, ve kterém obsluha právě je. */
  activeKey?: string
  /** Popis panelu pro čtečku. */
  label?: string
  ref?: Ref<HTMLElement>
}

/**
 * Nav / Boční panel nástrojů — § Navigace. Říká, co na obrazovce dělám;
 * horní lišta říká, kde jsem. Obojí nikdy na stejném místě.
 */
export function ToolRail({
  items,
  activeKey,
  label = 'Nástroje',
  className,
  ...rest
}: ToolRailProps) {
  return (
    <nav
      className={['dg-tool-rail', className].filter(Boolean).join(' ')}
      aria-label={label}
      {...rest}
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={[
            'dg-tool-rail__tool',
            item.primary ? 'is-primary' : null,
            item.key === activeKey ? 'is-active' : null,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-current={item.key === activeKey ? 'true' : undefined}
          onClick={item.onClick}
        >
          <span className="dg-tool-rail__btn">
            {item.icon}
            {item.badge ? <span className="dg-tool-rail__dot" aria-hidden="true" /> : null}
          </span>
          <span className="dg-tool-rail__label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

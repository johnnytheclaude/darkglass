import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface FactCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek údaje („Typ dokladu“). */
  label: ReactNode
  /** Hodnota — druhý, výraznější řádek. */
  value: ReactNode
  /** Poznámka pod hodnotou; v akcentu, když na ni má obsluha reagovat. */
  note?: ReactNode
  /** Poznámka v barvě akcentu (výzva k doplnění) místo tlumeného textu. */
  noteAccent?: boolean
  /** Akce vpravo od hodnoty (např. „Doplnit firmu“). */
  action?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Karta / Údaj — § Pokladna · platba (artboardy 04–06, „Typ dokladu“).
 * Tichý podklad, na něm popisek, hodnota a nepovinná poznámka. Používá se
 * v rozpisu platby pro údaje, které se za běhu mění (typ dokladu, odběratel),
 * ale nejsou to částky — ty patří do rozpisu platby.
 */
export function FactCard({
  label,
  value,
  note,
  noteAccent = false,
  action,
  className,
  ...rest
}: FactCardProps) {
  return (
    <div className={['dg-fact-card', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-fact-card__label">{label}</span>
      <div className="dg-fact-card__row">
        <span className="dg-fact-card__value">{value}</span>
        {action != null ? <span className="dg-fact-card__action">{action}</span> : null}
      </div>
      {note != null ? (
        <span
          className={['dg-fact-card__note', noteAccent ? 'is-accent' : null].filter(Boolean).join(' ')}
        >
          {note}
        </span>
      ) : null}
    </div>
  )
}

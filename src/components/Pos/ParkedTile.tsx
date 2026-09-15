import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

export type ParkedTileTone = 'neutral' | 'warning' | 'danger'

// `name` je název odloženého účtu a `content` jeho obsah, ne microdata prohlížeče —
// oba nativní atributy proto ustupují.
export interface ParkedTileProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'name' | 'content'> {
  /** Název účtu („Zkušební kabina 3“) — láme se na dva řádky. */
  name: ReactNode
  /** Stáří účtu v odznaku („před 22 min“). */
  age?: ReactNode
  /** Ladění odznaku: čím déle účet čeká, tím naléhavější. */
  ageTone?: ParkedTileTone
  /** Počet položek vpravo v horním řádku („4 položky“). */
  count?: ReactNode
  /** Řádek pod názvem — zákazník a čas odložení. */
  meta?: ReactNode
  /** Co v účtu je, jednou větou; delší se ukončí výpustkou. */
  content?: ReactNode
  /** Částka účtu — největší číslo na dlaždici. */
  amount: ReactNode
  /** Vybraná dlaždice nese akcent a její detail je vedle. */
  selected?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * Tile / Odložený účet — čekající košík v mřížce odložených účtů.
 * Naléhavost nese text odznaku („před 46 min“), barva je jen doplněk: účet,
 * který čeká hodinu, se pozná i bez rozlišení barev.
 */
export function ParkedTile({
  name,
  age,
  ageTone = 'neutral',
  count,
  meta,
  content,
  amount,
  selected = false,
  type = 'button',
  className,
  ...rest
}: ParkedTileProps) {
  const classes = ['dg-parked-tile', selected ? 'is-selected' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} aria-pressed={selected || undefined} {...rest}>
      {age != null || count != null ? (
        <span className="dg-parked-tile__head">
          {age != null ? (
            <span className={`dg-parked-tile__age dg-parked-tile__age--${ageTone}`}>{age}</span>
          ) : null}
          {count != null ? <span className="dg-parked-tile__count">{count}</span> : null}
        </span>
      ) : null}
      <span className="dg-parked-tile__name">{name}</span>
      {meta != null ? <span className="dg-parked-tile__meta">{meta}</span> : null}
      {content != null ? <span className="dg-parked-tile__content">{content}</span> : null}
      <span className="dg-parked-tile__amount">{amount}</span>
    </button>
  )
}

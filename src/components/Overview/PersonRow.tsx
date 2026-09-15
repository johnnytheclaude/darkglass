import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { Avatar } from './Avatar'

export interface PersonRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Iniciály do kolečka; místo nich se dá vložit vlastní `avatar`. */
  initials?: string
  avatar?: ReactNode
  name?: ReactNode
  /** Role, poznámka („Majitel · sám na prodejně"). */
  note?: ReactNode
  /** Co je vpravo — odznak, čas, tlačítko. */
  trailing?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Osoba — řádek s kolečkem iniciál, jménem a poznámkou. Používá se v kartách
 * přehledu (kdo je na směně) i v seznamech lidí.
 */
export function PersonRow({
  initials,
  avatar,
  name,
  note,
  trailing,
  className,
  ...rest
}: PersonRowProps) {
  const classes = ['dg-person-row', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {avatar ?? (initials ? <Avatar initials={initials} /> : null)}
      <span className="dg-person-row__text">
        {name != null ? <span className="dg-person-row__name">{name}</span> : null}
        {note != null ? <span className="dg-person-row__note">{note}</span> : null}
      </span>
      {trailing != null ? <span className="dg-person-row__trailing">{trailing}</span> : null}
    </div>
  )
}

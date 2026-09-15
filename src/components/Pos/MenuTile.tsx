import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

export type MenuTileTone = 'neutral' | 'accent' | 'warning' | 'danger' | 'success'

export interface MenuTileProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'name'> {
  /** Název dlaždice („Doklady“). */
  name: ReactNode
  /** Popis stavu pod názvem („2 čekají · 1 chyba“). */
  description?: ReactNode
  /** Barva popisu — stav, na který má obsluha reagovat. */
  tone?: MenuTileTone
  ref?: Ref<HTMLButtonElement>
}

/**
 * Tile / Menu — dlaždice menu Pokladny (F9).
 * Vysoká 110 px, aby se trefila prstem; popis nese stav dané agendy.
 */
export function MenuTile({
  name,
  description,
  tone = 'neutral',
  type = 'button',
  className,
  ...rest
}: MenuTileProps) {
  return (
    <button
      type={type}
      className={['dg-menu-tile', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="dg-menu-tile__name">{name}</span>
      {description != null ? (
        <span className={`dg-menu-tile__desc dg-menu-tile__desc--${tone}`}>{description}</span>
      ) : null}
    </button>
  )
}

import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

export interface PlaceholderTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ikona nad popiskem. */
  icon?: ReactNode
  /** Co se stane po klepnutí („Odložit aktuální košík · F6“). */
  children?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

/**
 * Tile / Prázdné místo — volné pole v mřížce, které zve k doplnění.
 * Čárkovaný obrys říká, že tam zatím nic není; je to tlačítko, aby se akce
 * dala spustit i tabulátorem a přečíst odečítačem.
 */
export function PlaceholderTile({
  icon,
  children,
  type = 'button',
  className,
  ...rest
}: PlaceholderTileProps) {
  return (
    <button
      type={type}
      className={['dg-placeholder-tile', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {icon != null ? (
        <span className="dg-placeholder-tile__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-placeholder-tile__label">{children}</span>
    </button>
  )
}

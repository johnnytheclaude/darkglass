import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

export interface ActionTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` je hlavní akce obrazovky — v akcentu, jen jedna na kartu. */
  variant?: 'default' | 'primary'
  /** Ikona nad popiskem. */
  icon?: ReactNode
  children?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

/**
 * Tile / Akce — dlaždice rychlé akce. Ikona nad popiskem, dotykový cíl 74 px.
 * Popisek se zalomí na dva řádky, dlaždice nepřeteče.
 */
export function ActionTile({
  variant = 'default',
  icon,
  children,
  className,
  type,
  ...rest
}: ActionTileProps) {
  const classes = ['dg-action-tile', `dg-action-tile--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {icon != null ? <span className="dg-action-tile__icon">{icon}</span> : null}
      <span className="dg-action-tile__label">{children}</span>
    </button>
  )
}

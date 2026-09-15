import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

export type StockTileTone = 'ok' | 'warning' | 'danger' | 'neutral'

export interface StockTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Velikost nebo jiná varianta („M“, „128“). */
  label: ReactNode
  /** Kolik kusů je na téhle prodejně („14 ks“, „sklad neevidován“). */
  count: ReactNode
  /** Ladění počtu — barva je jen doplněk, nositelem informace je text. */
  tone?: StockTileTone
  /** Právě vybraná varianta. */
  selected?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * Stock Tile — dlaždice dostupnosti velikosti (§ Pokladna · prodej, artboard
 * „Hledání zboží“). Velikost nahoře, počet kusů pod ní; varianta, která není
 * skladem, zůstává vidět a jen ztmavne — obsluha se na ni zákazníka doptá.
 */
export function StockTile({
  label,
  count,
  tone = 'neutral',
  selected = false,
  type = 'button',
  className,
  ...rest
}: StockTileProps) {
  const classes = ['dg-stock-tile', selected ? 'is-selected' : null, className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} aria-pressed={selected} {...rest}>
      <span className="dg-stock-tile__label">{label}</span>
      <span className={`dg-stock-tile__count dg-stock-tile__count--${tone}`}>{count}</span>
    </button>
  )
}

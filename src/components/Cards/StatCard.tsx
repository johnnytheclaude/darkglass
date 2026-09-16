import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconArrowDown } from '../Icons/IconArrowDown'
import { IconArrowUp } from '../Icons/IconArrowUp'

export type StatDelta = 'up' | 'down' | 'none'
export type StatCardSize = 'm' | 's'

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek nad číslem — co se měří. */
  label: ReactNode
  /** Číslo. Je vždy větší než jeho popisek. */
  value: ReactNode
  /** Srovnání pod číslem („o 18 % víc než včera“). */
  delta?: ReactNode
  /** Směr srovnání; `none` je šedé bez šipky. */
  deltaDirection?: StatDelta
  /**
   * Velikost. `m` (výchozí) je karta obrazovky — číslo 34 px a výška 150.
   * `s` je úzká dvojice údajů z návrhu mobilu (artboard 09): výplň 14,
   * popisek 12,5 a číslo 24, aby se dvě karty vešly vedle sebe na 375 px.
   */
  size?: StatCardSize
  ref?: Ref<HTMLDivElement>
}

/**
 * StatCard — karta s jedním velkým číslem a srovnáním. Směr se nesděluje
 * jen barvou: nahoru a dolů mají vlastní šipku.
 */
export function StatCard({
  label,
  value,
  delta,
  deltaDirection = 'none',
  size = 'm',
  className,
  ...rest
}: StatCardProps) {
  const classes = ['dg-stat-card', size === 's' && 'dg-stat-card--s', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      <span className="dg-stat-card__label">{label}</span>
      <span className="dg-stat-card__value">{value}</span>
      {delta != null ? (
        <span className={`dg-stat-card__delta dg-stat-card__delta--${deltaDirection}`}>
          {deltaDirection === 'up' ? <IconArrowUp size={14} /> : null}
          {deltaDirection === 'down' ? <IconArrowDown size={14} /> : null}
          <span className="dg-stat-card__delta-text">{delta}</span>
        </span>
      ) : null}
    </div>
  )
}

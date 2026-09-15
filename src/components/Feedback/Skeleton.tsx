import type { HTMLAttributes, Ref } from 'react'

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Šířka obdélníku; číslo se bere jako px při --scale 1. */
  width?: number | string
  /** Výška obdélníku; číslo se bere jako px při --scale 1. */
  height?: number | string
  /** Kolečko místo pilulky (avatar, ikona). */
  circle?: boolean
  ref?: Ref<HTMLSpanElement>
}

const px = (v: number | string) => (typeof v === 'number' ? `calc(${v}px * var(--scale))` : v)

/** Skeleton — jeden šedý obdélník místa, kde se teprve načítá obsah. */
export function Skeleton({ width, height = 11, circle = false, className, style, ...rest }: SkeletonProps) {
  const classes = ['dg-skeleton', circle ? 'dg-skeleton--circle' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classes}
      aria-hidden="true"
      style={{
        width: width != null ? px(width) : undefined,
        height: px(height),
        ...style,
      }}
      {...rest}
    />
  )
}

export interface SkeletonListProps extends HTMLAttributes<HTMLDivElement> {
  /** Kolik řádků se předstírá (návrh kreslí tři). */
  rows?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * SkeletonList — karta s načítanými řádky. Nahrazuje seznam, dokud data
 * nedorazí; tvar odpovídá řádku seznamu, ať stránka neposkočí.
 */
export function SkeletonList({ rows = 3, className, ...rest }: SkeletonListProps) {
  const classes = ['dg-skeleton-list', className].filter(Boolean).join(' ')
  const widths = [
    [210, 130],
    [160, 100],
    [190, 120],
  ]

  return (
    <div className={classes} aria-busy="true" aria-live="polite" {...rest}>
      {Array.from({ length: rows }, (_, i) => {
        const [wide, narrow] = widths[i % widths.length]
        return (
          <div className="dg-skeleton-list__row" key={i}>
            <Skeleton circle width={38} height={38} />
            <div className="dg-skeleton-list__bars">
              <Skeleton width={wide} height={11} />
              <Skeleton width={narrow} height={9} />
            </div>
            <Skeleton width={60} height={11} />
          </div>
        )
      })}
    </div>
  )
}

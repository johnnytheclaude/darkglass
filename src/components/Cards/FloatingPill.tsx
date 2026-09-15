import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type FloatingPillVariant = 'glass' | 'live'

export interface FloatingPillProps extends HTMLAttributes<HTMLDivElement> {
  /** `glass` je běžná plovoucí pilulka, `live` má červenou tečku živého stavu. */
  variant?: FloatingPillVariant
  /** Ikona před popiskem (jen u `glass`). */
  icon?: ReactNode
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Pill / Glass a Pill / Live — plovoucí pilulka nad obsahem. Nese jeden
 * krátký údaj; text se nikdy nezalomí, pilulka roste podle obsahu.
 */
export function FloatingPill({
  variant = 'glass',
  icon,
  children,
  className,
  role,
  ...rest
}: FloatingPillProps) {
  const classes = ['dg-floating-pill', `dg-floating-pill--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role={role ?? 'status'} {...rest}>
      {variant === 'live' ? <span className="dg-floating-pill__dot" /> : null}
      {variant !== 'live' && icon != null ? (
        <span className="dg-floating-pill__icon">{icon}</span>
      ) : null}
      <span className="dg-floating-pill__label">{children}</span>
    </div>
  )
}

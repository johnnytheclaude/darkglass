import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral' | 'plain'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Ladění stavu; návrh má šest barevných a dvě tiché varianty. */
  tone?: BadgeTone
  /** Ikona před popiskem (13 px). Se `dot` se nekreslí. */
  icon?: ReactNode
  /** Místo ikony tečka v barvě ladění na tiché výplni (návrh „S tečkou“). */
  dot?: boolean
  children?: ReactNode
  ref?: Ref<HTMLSpanElement>
}

/**
 * Badge — odznak stavu. Stav nikdy nesděluje jen barva: vedle ní je
 * vždy slovo a u barevných ladění i tvar (ikona nebo tečka).
 */
export function Badge({
  tone = 'neutral',
  icon,
  dot = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  const classes = [
    'dg-badge',
    `dg-badge--${tone}`,
    dot ? 'dg-badge--dot' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {dot ? <span className="dg-badge__dot" /> : null}
      {!dot && icon ? <span className="dg-badge__icon">{icon}</span> : null}
      <span className="dg-badge__label">{children}</span>
    </span>
  )
}

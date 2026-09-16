import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type BadgeTone =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'
  | 'neutral'
  | 'plain'
  /** Obrácený odznak — výplň v barvě textu, popisek v barvě podkladu. */
  | 'contrast'

export type BadgeSize = 's' | 'm'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Ladění stavu; návrh má šest barevných a dvě tiché varianty. */
  tone?: BadgeTone
  /** Ikona před popiskem (13 px). Se `dot` se nekreslí. */
  icon?: ReactNode
  /** Místo ikony tečka v barvě ladění na tiché výplni (návrh „S tečkou“). */
  dot?: boolean
  /**
   * Ladění samotné tečky, když má být jiné než ladění odznaku — bílý odznak
   * „Živě“ s červenou tečkou z návrhu mobilu.
   */
  dotTone?: BadgeTone
  /**
   * Velikost. `s` (výchozí) je odznak ve výpisu — 28 px. `m` je odznak
   * v hlavičce telefonu z návrhu mobilu: 38 px a popisek 14 px, aby ho bylo
   * vidět vedle nadpisu obrazovky.
   */
  size?: BadgeSize
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
  dotTone,
  size = 's',
  children,
  className,
  ...rest
}: BadgeProps) {
  const classes = [
    'dg-badge',
    `dg-badge--${tone}`,
    dot ? 'dg-badge--dot' : null,
    size === 'm' ? 'dg-badge--m' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {dot ? (
        <span
          className={['dg-badge__dot', dotTone ? `dg-badge__dot--${dotTone}` : null]
            .filter(Boolean)
            .join(' ')}
        />
      ) : null}
      {!dot && icon ? <span className="dg-badge__icon">{icon}</span> : null}
      <span className="dg-badge__label">{children}</span>
    </span>
  )
}

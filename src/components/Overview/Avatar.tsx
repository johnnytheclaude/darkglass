import type { HTMLAttributes, Ref } from 'react'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Iniciály (jeden nebo dva znaky). */
  initials: string
  /** Která z pěti barev kolečka; bez volby se odvodí z iniciál. */
  tone?: 1 | 2 | 3 | 4 | 5
  /** Hrana kolečka v px při --scale 1 (návrh 40). */
  size?: number
  ref?: Ref<HTMLSpanElement>
}

/**
 * Avatar — kolečko s iniciálami. Fotku knihovna nezná; barva se odvodí
 * z iniciál, takže stejný člověk má pořád stejnou.
 */
export function Avatar({ initials, tone, size = 40, className, style, ...rest }: AvatarProps) {
  const text = initials.slice(0, 2).toUpperCase()
  const pick =
    tone ?? ((([...text].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 5) + 1) as 1 | 2 | 3 | 4 | 5)
  const classes = ['dg-avatar', `dg-avatar--${pick}`, className].filter(Boolean).join(' ')

  return (
    <span
      className={classes}
      style={{ width: `calc(${size}px * var(--scale))`, height: `calc(${size}px * var(--scale))`, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {text}
    </span>
  )
}

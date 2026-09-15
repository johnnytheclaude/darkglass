import type { HTMLAttributes, Ref } from 'react'

export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Iniciály (jeden nebo dva znaky). */
  initials: string
  /** Která z pěti barev kolečka; bez volby se odvodí z iniciál. */
  tone?: 1 | 2 | 3 | 4 | 5
  /** Hrana kolečka v px při --scale 1 (návrh 28, 36, 44 a 56; výchozí 40). */
  size?: number
  /** Tečka stavu v pravém dolním rohu (návrh „Se stavem“). */
  status?: AvatarStatus
  ref?: Ref<HTMLSpanElement>
}

/** Iniciály rostou s kolečkem podle čtyř velikostí z návrhu (28/11, 36/13, 44/14,5, 56/18). */
const STEPS: Array<[number, number]> = [
  [28, 11],
  [36, 13],
  [44, 14.5],
  [56, 18],
]

function initialsSize(size: number) {
  if (size <= STEPS[0][0]) return (size / STEPS[0][0]) * STEPS[0][1]
  for (let i = 1; i < STEPS.length; i += 1) {
    const [prevEdge, prevFont] = STEPS[i - 1]
    const [edge, font] = STEPS[i]
    if (size <= edge) return prevFont + ((size - prevEdge) / (edge - prevEdge)) * (font - prevFont)
  }
  const [edge, font] = STEPS[STEPS.length - 1]
  return (size / edge) * font
}

/**
 * Avatar — kolečko s iniciálami. Fotku knihovna nezná; barva se odvodí
 * z iniciál, takže stejný člověk má pořád stejnou.
 */
export function Avatar({
  initials,
  tone,
  size = 40,
  status,
  className,
  style,
  ...rest
}: AvatarProps) {
  const text = initials.slice(0, 2).toUpperCase()
  const pick =
    tone ?? ((([...text].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 5) + 1) as 1 | 2 | 3 | 4 | 5)
  const classes = ['dg-avatar', `dg-avatar--${pick}`, className].filter(Boolean).join(' ')

  return (
    <span
      className={classes}
      style={{
        width: `calc(${size}px * var(--scale))`,
        height: `calc(${size}px * var(--scale))`,
        fontSize: `calc(${Math.round(initialsSize(size) * 10) / 10}px * var(--scale))`,
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    >
      {text}
      {status ? (
        <span
          className={`dg-avatar__dot dg-avatar__dot--${status}`}
          style={{
            width: `calc(${Math.round(size * 0.32)}px * var(--scale))`,
            height: `calc(${Math.round(size * 0.32)}px * var(--scale))`,
          }}
        />
      ) : null}
    </span>
  )
}

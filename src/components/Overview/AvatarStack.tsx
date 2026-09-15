import type { HTMLAttributes, Ref } from 'react'
import { Avatar } from './Avatar'

export interface AvatarStackItem {
  initials: string
  tone?: 1 | 2 | 3 | 4 | 5
}

export interface AvatarStackProps extends HTMLAttributes<HTMLSpanElement> {
  items: AvatarStackItem[]
  /** Kolik koleček se ukáže, než se zbytek sečte do „+N“ (návrh 3 + zbytek). */
  max?: number
  /** Hrana kolečka v px při --scale 1 (návrh 38). */
  size?: number
  ref?: Ref<HTMLSpanElement>
}

/**
 * AvatarStack — skupina lidí v jednom místě. Kolečka se překrývají,
 * přebytek se sečte do posledního; pořadí odpovídá pořadí v `items`.
 */
export function AvatarStack({ items, max = 3, size = 38, className, ...rest }: AvatarStackProps) {
  const shown = items.slice(0, max)
  const rest_ = items.length - shown.length
  const classes = ['dg-avatar-stack', className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {shown.map((item, i) => (
        <Avatar key={i} initials={item.initials} tone={item.tone} size={size} />
      ))}
      {rest_ > 0 ? (
        <Avatar initials={`+${rest_}`} tone={5} size={size} className="dg-avatar-stack__more" />
      ) : null}
    </span>
  )
}

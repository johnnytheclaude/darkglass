import type { HTMLAttributes, Ref } from 'react'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Klávesy zkratky v pořadí, jak se mačkají: ['⌘', 'K'] nebo ['F9']. */
  keys: string[]
  ref?: Ref<HTMLSpanElement>
}

/**
 * Kbd — klávesová zkratka. Každá klávesa je vlastní dlaždice, takže je vidět,
 * kolik kláves se mačká; sázíme přes <kbd>, ne přes obarvený text.
 */
export function Kbd({ keys, className, ...rest }: KbdProps) {
  return (
    <span className={['dg-kbd', className].filter(Boolean).join(' ')} {...rest}>
      {keys.map((key, i) => (
        <kbd className="dg-kbd__key" key={`${key}-${i}`}>
          {key}
        </kbd>
      ))}
    </span>
  )
}

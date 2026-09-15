import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface FootnoteProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Patička — tichý řádek na spodní hraně obrazovky: verze, režim, poslední
 * synchronizace. Nikdy v ní nestojí nic, co by obsluha musela přečíst, aby
 * mohla pokračovat.
 */
export function Footnote({ children, className, ...rest }: FootnoteProps) {
  return (
    <div className={['dg-footnote', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface SectionBoxProps extends HTMLAttributes<HTMLDivElement> {
  /** Svisle místo vedle sebe. */
  column?: boolean
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Box / Sekce — obal hlavní sekce obrazovky. Drží karty pohromadě a odděluje
 * je od pozadí; sám nemá nadpis ani vlastní stav.
 */
export function SectionBox({ column = false, children, className, ...rest }: SectionBoxProps) {
  const classes = ['dg-section-box', column && 'dg-section-box--column', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

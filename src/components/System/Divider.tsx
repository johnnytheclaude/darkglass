import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek uprostřed linky („nebo“). Bez něj je to jen vlasová linka. */
  label?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Divider — oddělovač, s popiskem i bez. Linka je vždy vlasová (1 px) a
 * nezhoustne se zvětšením UI; roste jen text a mezery okolo.
 */
export function Divider({ label, className, ...rest }: DividerProps) {
  if (label == null) {
    return (
      <div
        className={['dg-divider', 'dg-divider--plain', className].filter(Boolean).join(' ')}
        role="separator"
        {...rest}
      />
    )
  }

  return (
    <div className={['dg-divider', className].filter(Boolean).join(' ')} role="separator" {...rest}>
      <span className="dg-divider__line" aria-hidden="true" />
      <span className="dg-divider__label">{label}</span>
      <span className="dg-divider__line" aria-hidden="true" />
    </div>
  )
}

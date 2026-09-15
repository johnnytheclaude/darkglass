import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface KeyValueRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Popisek údaje. */
  label: ReactNode
  /** Hodnota údaje; vždy výraznější než popisek. */
  value: ReactNode
  /**
   * Hlavní údaj seznamu (návrh: zůstatek poukazu, artboard 27) — hodnota je
   * o stupeň větší a těžší, popisek zůstává stejný. Na řádek v seznamu jich
   * patří jen jeden, jinak se zvýraznění ztratí.
   */
  strong?: boolean
  ref?: Ref<HTMLDivElement>
}

/** KeyValueRow — jeden řádek dvojice popisek – hodnota. */
export function KeyValueRow({ label, value, strong, className, ...rest }: KeyValueRowProps) {
  const classes = ['dg-kv', strong ? 'is-strong' : null, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <span className="dg-kv__key">{label}</span>
      <span className="dg-kv__value">{value}</span>
    </div>
  )
}

export interface KeyValueListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * KeyValueList — karta se seznamem údajů. Hodnoty drží jeden sloupec,
 * aby se daly přečíst shora dolů bez bloudění očima.
 */
export function KeyValueList({ children, className, ...rest }: KeyValueListProps) {
  const classes = ['dg-kv-list', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

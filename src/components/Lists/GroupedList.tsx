import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface GroupedListProps extends HTMLAttributes<HTMLDivElement> {
  /** Řádky seznamu (ListRow). Výplň a rádius nese blok, ne řádky. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * GroupedList — seskupený seznam jako jeden blok. Linka mezi řádky začíná
 * až za dlaždicí, takže seznam drží pohromadě i o stovkách řádků.
 */
export function GroupedList({ children, className, ...rest }: GroupedListProps) {
  const classes = ['dg-grouped-list', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface TableStateColumn {
  label: ReactNode
  /** Pevná šířka sloupce; bez ní se sloupec roztáhne po zbytku. */
  width?: number | string
}

export interface TableFrameProps extends HTMLAttributes<HTMLDivElement> {
  columns: TableStateColumn[]
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Vnitřní rám pro stavy tabulky (prázdno, načítání) — hlavička sloupců
 * a pod ní místo pro obsah. Sám se z balíku nevyváží: veřejné jsou
 * TableEmpty a TableLoading, plná tabulka patří do § Tabulka.
 */
export function TableFrame({ columns, children, className, ...rest }: TableFrameProps) {
  const classes = ['dg-table-state', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="dg-table-state__header">
        {columns.map((column, i) => (
          <span
            className="dg-table-state__th"
            key={i}
            style={column.width != null ? { flex: '0 0 auto', width: column.width } : undefined}
          >
            {column.label}
          </span>
        ))}
      </div>
      {children}
    </div>
  )
}

import type { HTMLAttributes, Ref } from 'react'
import { TableFrame } from './TableFrame'
import type { TableStateColumn } from './TableFrame'

export interface TableLoadingProps extends HTMLAttributes<HTMLDivElement> {
  columns: TableStateColumn[]
  /** Kolik zástupných řádků se ukáže. */
  rows?: number
  /** Čtečka slyší jen tohle — zástupné pruhy pro ni nic neznamenají. */
  label?: string
  ref?: Ref<HTMLDivElement>
}

/** Šířky prvního pruhu se střídají, aby řádky nevypadaly jako obtisk. */
const NAME_WIDTHS = ['180px', '140px', '200px', '160px']

/**
 * Načítání tabulky — § Data · rozšíření. Místo prázdné plochy zástupné pruhy
 * v rozměru skutečných řádků, takže se obsah po načtení nepřeskládá.
 */
export function TableLoading({
  columns,
  rows = 4,
  label = 'Načítám…',
  className,
  ...rest
}: TableLoadingProps) {
  const classes = ['dg-table-loading', className].filter(Boolean).join(' ')

  return (
    <TableFrame
      className={classes}
      columns={columns}
      aria-busy="true"
      aria-label={label}
      role="status"
      {...rest}
    >
      {Array.from({ length: Math.max(0, rows) }, (_, row) => (
        <div className="dg-table-loading__row" key={row}>
          {columns.map((column, i) => (
            <span
              className="dg-table-loading__cell"
              key={i}
              style={column.width != null ? { flex: '0 0 auto', width: column.width } : undefined}
            >
              {i === 0 ? <span className="dg-table-loading__square" /> : null}
              <span
                className="dg-table-loading__bar"
                style={i === 0 ? { width: NAME_WIDTHS[row % NAME_WIDTHS.length] } : undefined}
              />
            </span>
          ))}
        </div>
      ))}
    </TableFrame>
  )
}

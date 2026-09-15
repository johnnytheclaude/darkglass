import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { TableFrame } from './TableFrame'
import type { TableStateColumn } from './TableFrame'

export interface TableEmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  columns: TableStateColumn[]
  /** Ikona do kolečka nad textem. */
  icon?: ReactNode
  title?: ReactNode
  description?: ReactNode
  /** Co může člověk udělat — tlačítko „Zrušit filtr". */
  action?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Prázdná tabulka — § Data · rozšíření. Hlavička sloupců zůstane stát, aby
 * bylo vidět, co se hledalo; uvnitř je vysvětlení, proč není co ukázat.
 */
export function TableEmpty({
  columns,
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: TableEmptyProps) {
  const classes = ['dg-table-empty', className].filter(Boolean).join(' ')

  return (
    <TableFrame className={classes} columns={columns} {...rest}>
      <div className="dg-table-empty__body">
        <span className="dg-table-empty__icon" aria-hidden={icon ? undefined : 'true'}>
          {icon}
        </span>
        {title != null ? <span className="dg-table-empty__title">{title}</span> : null}
        {description != null ? (
          <span className="dg-table-empty__text">{description}</span>
        ) : null}
        {action != null ? <span className="dg-table-empty__action">{action}</span> : null}
      </div>
    </TableFrame>
  )
}

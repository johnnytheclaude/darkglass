import type { HTMLAttributes, InputHTMLAttributes, ReactNode, Ref } from 'react'
import { IconSearch } from '../Icons/IconSearch'

export interface TableSearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  ref?: Ref<HTMLInputElement>
}

/** TableSearch — hledání v panelu nad tabulkou (pilulka 40 px s ikonou). */
export function TableSearch({ className, placeholder = 'Hledat…', ...rest }: TableSearchProps) {
  const classes = ['dg-table-search', className].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <IconSearch size={16} className="dg-table-search__icon" />
      <input type="search" className="dg-table-search__input" placeholder={placeholder} {...rest} />
    </span>
  )
}

export interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Hledání vlevo. */
  search?: ReactNode
  /** Filtrační štítky za hledáním. */
  filters?: ReactNode
  /** Souhrn vpravo („4 položky · celkem 37 585 Kč“). */
  count?: ReactNode
  /** Tlačítka úplně vpravo. */
  actions?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * TableToolbar — panel nad tabulkou. Vlevo hledání a filtry, vpravo souhrn
 * a akce; v úzkém místě se zalomí na víc řádků, nikdy nepřeteče.
 */
export function TableToolbar({
  search,
  filters,
  count,
  actions,
  className,
  ...rest
}: TableToolbarProps) {
  const classes = ['dg-table-toolbar', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {search != null ? <span className="dg-table-toolbar__search">{search}</span> : null}
      {filters != null ? <span className="dg-table-toolbar__filters">{filters}</span> : null}
      {count != null ? <span className="dg-table-toolbar__count">{count}</span> : null}
      {actions != null ? <span className="dg-table-toolbar__actions">{actions}</span> : null}
    </div>
  )
}

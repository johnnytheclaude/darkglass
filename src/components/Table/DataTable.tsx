import { Fragment } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconCheck } from '../Icons/IconCheck'
import { IconChevronRight } from '../Icons/IconChevronRight'
import { IconSort } from '../Icons/IconSort'
import { GroupHeader } from '../Pos/GroupHeader'

export interface DataTableColumn {
  label: ReactNode
  /** Pevná šířka sloupce v px při --scale 1; bez ní se sloupec roztáhne. */
  width?: number
  /** Čísla patří vpravo. */
  align?: 'left' | 'right'
  /** Ztišený sloupec (doplňkový údaj). */
  muted?: boolean
  /** Sloupec se dá řadit — vedle popisku je šipka. */
  sortable?: boolean
}

export interface DataTableRow {
  id: string
  /** Buňky v pořadí sloupců. */
  cells: ReactNode[]
  /**
   * Podbarvení celého řádku (Row / Tint z návrhu): sedí (ok), chyba či záporná
   * hodnota (danger), doplňující údaj (info). Podklad nese jen zvýraznění —
   * co se stalo, musí říct i obsah buňky (znaménko, slovo, odznak).
   */
  tone?: 'ok' | 'danger' | 'info'
  /** Vybraný řádek (hromadný výběr) — zaškrtnuté políčko a tichý akcentový podklad. */
  selected?: boolean
  /** Mezitulek skupiny (Table / Group Header) nad tímto řádkem. */
  group?: { label: ReactNode; count?: number }
}

export interface DataTableProps extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn[]
  rows: DataTableRow[]
  /** Zaškrtávátko v prvním sloupci. */
  selectable?: boolean
  onSelectedChange?: (id: string, selected: boolean) => void
  /** Kliknutí na řádek — na konci se pak kreslí šipka. */
  onRowClick?: (id: string) => void
  ref?: Ref<HTMLDivElement>
}

const widthStyle = (w?: number) =>
  w != null ? { flex: '0 0 auto', width: `calc(${w}px * var(--scale))` } : undefined

/**
 * DataTable — tabulka pro seznamy o stovkách řádků. Čísla vpravo,
 * záporné hodnoty červeně (TableNumber), řádek v mínusu má tichý podklad.
 */
export function DataTable({
  columns,
  rows,
  selectable = false,
  onSelectedChange,
  onRowClick,
  className,
  ...rest
}: DataTableProps) {
  const classes = ['dg-table', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="table" {...rest}>
      <div className="dg-table__header" role="row">
        {selectable ? <span className="dg-table__check-col" /> : null}
        {columns.map((column, i) => (
          <span
            className={`dg-table__th dg-table__th--${column.align ?? 'left'}`}
            role="columnheader"
            key={i}
            style={widthStyle(column.width)}
          >
            <span className="dg-table__th-label">{column.label}</span>
            {column.sortable ? <IconSort size={12} className="dg-table__sort" /> : null}
          </span>
        ))}
        {onRowClick ? <span className="dg-table__action-col" /> : null}
      </div>
      {rows.map((row) => (
        <Fragment key={row.id}>
        {row.group ? (
          <GroupHeader
            className="dg-table__group"
            label={row.group.label}
            count={row.group.count}
          />
        ) : null}
        <div
          className={[
            'dg-table__tr',
            row.tone ? `dg-table__tr--${row.tone}` : null,
            row.selected ? 'dg-table__tr--selected' : null,
            onRowClick ? 'dg-table__tr--interactive' : null,
          ]
            .filter(Boolean)
            .join(' ')}
          role="row"
          onClick={onRowClick ? () => onRowClick(row.id) : undefined}
        >
          {selectable ? (
            <span className="dg-table__check-col">
              <button
                type="button"
                className={row.selected ? 'dg-table__check is-selected' : 'dg-table__check'}
                aria-pressed={!!row.selected}
                aria-label="Vybrat řádek"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectedChange?.(row.id, !row.selected)
                }}
              >
                {row.selected ? <IconCheck size={14} /> : null}
              </button>
            </span>
          ) : null}
          {columns.map((column, i) => (
            <span
              className={[
                'dg-table__td',
                `dg-table__td--${column.align ?? 'left'}`,
                column.muted ? 'dg-table__td--muted' : null,
              ]
                .filter(Boolean)
                .join(' ')}
              role="cell"
              key={i}
              style={widthStyle(column.width)}
            >
              {row.cells[i]}
            </span>
          ))}
          {onRowClick ? (
            <span className="dg-table__action-col">
              <IconChevronRight size={17} className="dg-table__chevron" />
            </span>
          ) : null}
        </div>
        </Fragment>
      ))}
    </div>
  )
}

export interface TableNameProps extends HTMLAttributes<HTMLSpanElement> {
  /** Miniatura zboží; `true` kreslí prázdné místo. */
  thumb?: ReactNode | boolean
  children?: ReactNode
  ref?: Ref<HTMLSpanElement>
}

/** TableName — buňka s miniaturou a názvem (první sloupec tabulky). */
export function TableName({ thumb = true, children, className, ...rest }: TableNameProps) {
  const classes = ['dg-table__name', className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {thumb ? <span className="dg-table__thumb">{thumb === true ? null : thumb}</span> : null}
      <span className="dg-table__name-label">{children}</span>
    </span>
  )
}

export interface TableNumberProps extends HTMLAttributes<HTMLSpanElement> {
  /** Záporná hodnota se kreslí červeně. */
  negative?: boolean
  children?: ReactNode
  ref?: Ref<HTMLSpanElement>
}

/** TableNumber — číslo v buňce; záporné je červené, ne jen se znaménkem. */
export function TableNumber({ negative = false, children, className, ...rest }: TableNumberProps) {
  const classes = ['dg-table__number', negative ? 'dg-table__number--negative' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}

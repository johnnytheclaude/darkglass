import { Fragment, useEffect, useRef, useState } from 'react'
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react'
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
   * hodnota (danger), nedodělek k doplnění (warn), doplňující údaj (info).
   * Podklad nese jen zvýraznění —
   * co se stalo, musí říct i obsah buňky (znaménko, slovo, odznak).
   */
  tone?: 'ok' | 'danger' | 'warn' | 'info'
  /** Vybraný řádek (hromadný výběr) — zaškrtnuté políčko a tichý akcentový podklad. */
  selected?: boolean
  /**
   * Jméno zaškrtávátka pro odečítač. Bez něj mají všechny řádky stejné
   * „Vybrat řádek" a nevidomý je od sebe nerozezná — seznam, ve kterém se
   * hromadná akce dělá naslepo. Aplikace sem posílá, co je na řádku vidět.
   */
  selectLabel?: string
  /** Mezitulek skupiny (Table / Group Header) nad tímto řádkem. */
  group?: { label: ReactNode; count?: number }
  /**
   * Úroveň zanoření řádku pod řádek nad ním (0 nebo bez hodnoty = samostatný
   * řádek). Vnořený řádek je odsazený a vede k němu svislá linka, takže je na
   * první pohled vidět, co pod co patří (pokladna a sklad pod svou prodejnou).
   * Tabulka zanoření jen kreslí — pořadí řádků skládá ten, kdo je posílá.
   */
  depth?: number
}

export interface DataTableProps extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn[]
  rows: DataTableRow[]
  /** Zaškrtávátko v prvním sloupci. */
  selectable?: boolean
  onSelectedChange?: (id: string, selected: boolean) => void
  /** Kliknutí na řádek — na konci se pak kreslí šipka. */
  onRowClick?: (id: string) => void
  /**
   * Řádek vybraný klávesnicí (šipky nahoru/dolů). Nese akcentový podklad a
   * sám se nascrolluje do výřezu — tabulku pak jde obsloužit bez myši.
   */
  activeId?: string | null
  /**
   * Svislé zarovnání buněk v řádku. `center` (výchozí) je pro čtené seznamy;
   * `top` je pro tabulku s editovatelnými buňkami, kde je pod polem ještě
   * popisek (varianta, poznámka) — pak stojí všechna pole řádku na jedné ose
   * a vyšší buňka ostatní neposune.
   */
  rowAlign?: 'center' | 'top'
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
  activeId = null,
  rowAlign = 'center',
  className,
  ...rest
}: DataTableProps) {
  const wrap = useRef<HTMLDivElement | null>(null)
  const [more, setMore] = useState({ left: false, right: false })

  const classes = [
    'dg-table',
    rowAlign === 'top' ? 'dg-table--rows-top' : null,
    more.left ? 'dg-table--more-left' : null,
    more.right ? 'dg-table--more-right' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Klávesnicí vybraný řádek musí být vidět i v dlouhém seznamu.
  useEffect(() => {
    if (activeId == null) return
    const row = wrap.current?.querySelector('[data-dg-active="true"]')
    row?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  // Trvalý náznak, že tabulka pokračuje za pravou hranou — na úzké obrazovce
  // (telefon) je jinak vidět jen první sloupec a cena ani stav skladu nedávají
  // o sobě vědět; macOS posuvník ukáže až při rolování (task #763).
  useEffect(() => {
    const el = wrap.current
    if (!el) return

    const update = () => {
      const left = el.scrollLeft > 1
      const right = el.scrollWidth - el.scrollLeft - el.clientWidth > 1
      setMore((prev) => (prev.left === left && prev.right === right ? prev : { left, right }))
    }

    update()
    el.addEventListener('scroll', update)
    const observer = new ResizeObserver(update)
    observer.observe(el)
    const grid = el.firstElementChild
    if (grid) observer.observe(grid)

    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [columns, rows])

  return (
    <div className={classes} role="table" ref={wrap} {...rest}>
      {/* Mřížka drží hlavičku i řádky v jedné šířce. Bez ní si při vodorovném
          posouvání každý řádek spočítal vlastní max-content a sloupce se
          v úzkém okně rozjely proti hlavičce (task #563). */}
      <div className="dg-table__grid" role="rowgroup">
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
            row.id === activeId ? 'dg-table__tr--active' : null,
            onRowClick ? 'dg-table__tr--interactive' : null,
            row.depth ? 'dg-table__tr--child' : null,
          ]
            .filter(Boolean)
            .join(' ')}
          role="row"
          aria-selected={row.id === activeId ? true : undefined}
          data-dg-active={row.id === activeId ? 'true' : undefined}
          onClick={onRowClick ? () => onRowClick(row.id) : undefined}
        >
          {selectable ? (
            <span className="dg-table__check-col">
              <button
                type="button"
                className={row.selected ? 'dg-table__check is-selected' : 'dg-table__check'}
                aria-pressed={!!row.selected}
                aria-label={row.selectLabel ?? 'Vybrat řádek'}
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
                i === 0 && row.depth ? 'dg-table__td--nested' : null,
              ]
                .filter(Boolean)
                .join(' ')}
              role="cell"
              key={i}
              style={
                i === 0 && row.depth
                  ? ({ ...widthStyle(column.width), '--dg-depth': row.depth } as CSSProperties)
                  : widthStyle(column.width)
              }
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

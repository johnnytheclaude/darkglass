import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconChevronLeft } from '../Icons/IconChevronLeft'
import { IconChevronRight } from '../Icons/IconChevronRight'

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** Aktuální stránka (od 1). */
  page: number
  pageCount: number
  onPageChange?: (page: number) => void
  /** Text vlevo („Zobrazeno 1–4 ze 4“). */
  info?: ReactNode
  prevLabel?: string
  nextLabel?: string
  ref?: Ref<HTMLDivElement>
}

/** Stránky kolem aktuální; zbytek se schová pod výpustku. */
function pagesFor(page: number, pageCount: number): Array<number | '…'> {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const out: Array<number | '…'> = [1]
  const from = Math.max(2, page - 1)
  const to = Math.min(pageCount - 1, page + 1)
  if (from > 2) out.push('…')
  for (let i = from; i <= to; i += 1) out.push(i)
  if (to < pageCount - 1) out.push('…')
  out.push(pageCount)
  return out
}

/**
 * Pagination — stránkování pod tabulkou. Čísla se drží kolem aktuální
 * stránky, zbytek je pod výpustkou, ať se řádek nikdy neroztáhne.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  info,
  prevLabel = 'Předchozí stránka',
  nextLabel = 'Další stránka',
  className,
  ...rest
}: PaginationProps) {
  const classes = ['dg-pagination', className].filter(Boolean).join(' ')
  const pages = pagesFor(page, Math.max(pageCount, 1))

  return (
    <nav className={classes} aria-label="Stránkování" {...rest}>
      {info != null ? <span className="dg-pagination__info">{info}</span> : null}
      <button
        type="button"
        className="dg-pagination__page"
        aria-label={prevLabel}
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
      >
        <IconChevronLeft size={16} />
      </button>
      {pages.map((item, i) =>
        item === '…' ? (
          <span className="dg-pagination__page dg-pagination__page--gap" key={`gap-${i}`}>
            …
          </span>
        ) : (
          <button
            type="button"
            className={
              item === page ? 'dg-pagination__page is-current' : 'dg-pagination__page'
            }
            key={item}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange?.(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className="dg-pagination__page"
        aria-label={nextLabel}
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
      >
        <IconChevronRight size={16} />
      </button>
    </nav>
  )
}

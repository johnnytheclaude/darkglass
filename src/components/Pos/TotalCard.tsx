import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface TotalCardRow {
  key: string
  label: ReactNode
  value: ReactNode
}

/** `m` = součet vedle košíku, `l` = jediné číslo na obrazovce (vrátit hotově). */
export type TotalCardSize = 'm' | 'l'

export interface TotalCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Velikost částky; `l` se čte přes pult, a proto nesnese nic kolem sebe. */
  size?: TotalCardSize
  /** Řádky nad čarou (mezisoučet, sleva, záloha…). */
  rows?: TotalCardRow[]
  /** Popisek nad částkou („Celkem“). */
  totalLabel?: ReactNode
  /** Výsledná částka — největší číslo na obrazovce. */
  total: ReactNode
  /** Řádek pod částkou (přepočet na eura a kurz). */
  note?: ReactNode
  /** Obsah pod kartou (tlačítka) nebo vlastní řádky navíc. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Karta / Součet — souhrn účtu vedle košíku.
 * Částka se nezalamuje ani u statisíců: nevejde-li se, zmenší se řez písma.
 */
export function TotalCard({
  rows = [],
  totalLabel,
  total,
  size = 'm',
  note,
  className,
  children,
  ...rest
}: TotalCardProps) {
  return (
    <div className={['dg-total-card', `dg-total-card--${size}`, className].filter(Boolean).join(' ')} {...rest}>
      {rows.map((row) => (
        <div key={row.key} className="dg-total-card__row">
          <span className="dg-total-card__label">{row.label}</span>
          <span className="dg-total-card__value">{row.value}</span>
        </div>
      ))}
      {children}
      {/* Čára odděluje rozpis od součtu — nad kartou s jediným číslem by
          oddělovala částku od ničeho, proto se bez rozpisu nekreslí. */}
      {rows.length > 0 || children != null ? <div className="dg-total-card__rule" /> : null}
      <div className="dg-total-card__total">
        {totalLabel != null ? (
          <span className="dg-total-card__total-label">{totalLabel}</span>
        ) : null}
        <span className="dg-total-card__amount">{total}</span>
        {note != null ? <span className="dg-total-card__note">{note}</span> : null}
      </div>
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface StatSparkCardProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  value?: ReactNode
  /** Odznak vedle popisku — srovnání s minulým obdobím (`Badge`). */
  badge?: ReactNode
  /** Vysvětlivka pod grafem — proti čemu se srovnává, co je v čísle započítané. */
  note?: ReactNode
  /** Sloupečky zleva doprava; poslední je ve výchozím stavu vyzdvižený. */
  bars: number[]
  /** Kolik je plná výška; bez něj se bere největší sloupec. */
  max?: number
  /** Který sloupec je v akcentu; `null` vypne zvýraznění. */
  highlightIndex?: number | null
  ref?: Ref<HTMLDivElement>
}

/**
 * Statistika s grafem — § Data · rozšíření. Číslo na první pohled a pod ním
 * tvar posledních období. Samostatný graf bez čísla je Sparkbars v § Grafy.
 */
export function StatSparkCard({
  label,
  value,
  badge,
  note,
  bars,
  max,
  highlightIndex,
  className,
  ...rest
}: StatSparkCardProps) {
  const classes = ['dg-stat-spark', className].filter(Boolean).join(' ')
  const top = max ?? Math.max(1, ...bars)
  const highlight = highlightIndex === undefined ? bars.length - 1 : highlightIndex

  return (
    <div className={classes} {...rest}>
      {label != null || badge != null ? (
        <div className="dg-stat-spark__head">
          {label != null ? <span className="dg-stat-spark__label">{label}</span> : null}
          {badge != null ? <span className="dg-stat-spark__badge">{badge}</span> : null}
        </div>
      ) : null}
      {value != null ? <span className="dg-stat-spark__value">{value}</span> : null}
      {/* Bez jediného sloupce se graf nekreslí vůbec — prázdný pruh po grafu
          vypadá jako chyba, a report běží i první den provozu. */}
      {bars.length > 0 ? (
        <div className="dg-stat-spark__bars">
          {bars.map((bar, i) => (
            <span
              className={
                i === highlight ? 'dg-stat-spark__bar dg-stat-spark__bar--on' : 'dg-stat-spark__bar'
              }
              key={i}
              style={{ height: `${Math.max(0, Math.min(100, (bar / top) * 100))}%` }}
            />
          ))}
        </div>
      ) : null}
      {note != null ? <span className="dg-stat-spark__note">{note}</span> : null}
    </div>
  )
}

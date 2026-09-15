import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type GaugeCardTone = 'success' | 'warning' | 'danger' | 'accent' | 'neutral'

export interface GaugeCardStat {
  label: ReactNode
  value: ReactNode
}

export interface GaugeCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  /** Odznak v hlavičce (Online, Offline) — bez popisku se nevykreslí. */
  statusLabel?: ReactNode
  statusTone?: GaugeCardTone
  subtitle?: ReactNode
  /** Velké číslo uprostřed ukazatele. */
  value?: ReactNode
  /** Jednotka pod číslem. */
  unit?: ReactNode
  /** Naplnění ukazatele v procentech (0–100). */
  percent?: number
  /** Dvojice údajů pod ukazatelem, oddělené linkou. */
  stats?: GaugeCardStat[]
  /** Hrana ukazatele v px při --scale 1 (návrh 200). */
  size?: number
  ref?: Ref<HTMLDivElement>
}

const STROKE = 16

/**
 * Card / Gauge — karta s kruhovým ukazatelem. Ukazatel je SVG (otáčené prvky
 * v HTML nafukují rodiče), údaje pod ním se v úzkém místě zalomí.
 */
export function GaugeCard({
  title,
  statusLabel,
  statusTone = 'success',
  subtitle,
  value,
  unit,
  percent = 0,
  stats,
  size = 200,
  className,
  ...rest
}: GaugeCardProps) {
  const pct = Math.max(0, Math.min(100, percent))
  const r = (size - STROKE) / 2
  const circumference = 2 * Math.PI * r
  const dash = (pct / 100) * circumference
  const angle = (pct / 100) * 2 * Math.PI - Math.PI / 2
  const knobX = size / 2 + r * Math.cos(angle)
  const knobY = size / 2 + r * Math.sin(angle)
  const classes = ['dg-gauge-card', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {title != null || statusLabel != null ? (
        <div className="dg-gauge-card__head">
          {title != null ? <span className="dg-gauge-card__title">{title}</span> : null}
          {statusLabel != null ? (
            <span className={`dg-gauge-card__status dg-gauge-card__status--${statusTone}`}>
              <span className="dg-gauge-card__dot" />
              {statusLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      {subtitle != null ? <span className="dg-gauge-card__sub">{subtitle}</span> : null}
      <div className="dg-gauge-card__wrap">
        <div className="dg-gauge-card__gauge" style={{ width: `calc(${size}px * var(--scale))` }}>
          <svg className="dg-gauge-card__svg" viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
            <circle
              className="dg-gauge-card__track"
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={STROKE}
            />
            <circle
              className="dg-gauge-card__value"
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference - dash}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            {pct > 0 ? (
              <circle className="dg-gauge-card__knob" cx={knobX} cy={knobY} r={11} />
            ) : null}
          </svg>
          <div className="dg-gauge-card__center">
            {value != null ? <span className="dg-gauge-card__amount">{value}</span> : null}
            {unit != null ? <span className="dg-gauge-card__unit">{unit}</span> : null}
          </div>
        </div>
      </div>
      {stats && stats.length > 0 ? (
        <div className="dg-gauge-card__stats">
          {stats.map((stat, i) => (
            <div key={i} className="dg-gauge-card__stat">
              <span className="dg-gauge-card__stat-label">{stat.label}</span>
              <span className="dg-gauge-card__stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

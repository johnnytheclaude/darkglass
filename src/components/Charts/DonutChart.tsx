import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { ChartCard } from './ChartCard'
import type { ChartTone } from './ChartCard'

export interface DonutSegment {
  label: ReactNode
  value: number
  /** Hotový podíl k zobrazení v legendě (např. „62 %"). */
  valueLabel?: ReactNode
  tone?: ChartTone
}

export interface DonutChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  segments: DonutSegment[]
  /** Velké číslo uprostřed prstence. */
  centerValue?: ReactNode
  /** Jednotka pod číslem. */
  centerUnit?: ReactNode
  /** Hrana prstence v px při --scale 1 (návrh 150). */
  size?: number
  ref?: Ref<HTMLDivElement>
}

const TONES: ChartTone[] = ['accent', 'success', 'purple', 'warning', 'danger', 'neutral']
const STROKE = 22

/**
 * Chart / Donut — prstenec s legendou. Prstenec se kreslí v SVG (otáčené
 * prvky v HTML nafukují rodiče), legenda se v úzkém místě zalomí pod něj.
 */
export function DonutChart({
  title,
  subtitle,
  segments,
  centerValue,
  centerUnit,
  size = 150,
  className,
  ...rest
}: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0)
  const r = (size - STROKE) / 2
  const circumference = 2 * Math.PI * r
  const classes = ['dg-donut', className].filter(Boolean).join(' ')

  let offset = 0

  return (
    <ChartCard className={classes} title={title} subtitle={subtitle} {...rest}>
      <div className="dg-donut__body">
        <div className="dg-donut__ring" style={{ width: `calc(${size}px * var(--scale))` }}>
          <svg
            className="dg-donut__svg"
            viewBox={`0 0 ${size} ${size}`}
            role="presentation"
            aria-hidden="true"
          >
            <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              <circle
                className="dg-donut__track"
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                strokeWidth={STROKE}
              />
              {segments.map((seg, i) => {
                const share = total > 0 ? Math.max(0, seg.value) / total : 0
                const dash = share * circumference
                const start = offset
                offset += dash
                return (
                  <circle
                    key={i}
                    className={`dg-donut__seg dg-donut__seg--${seg.tone ?? TONES[i % TONES.length]}`}
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    strokeWidth={STROKE}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={-start}
                  />
                )
              })}
            </g>
          </svg>
          {centerValue != null || centerUnit != null ? (
            <div className="dg-donut__center">
              {centerValue != null ? (
                <span className="dg-donut__center-value">{centerValue}</span>
              ) : null}
              {centerUnit != null ? (
                <span className="dg-donut__center-unit">{centerUnit}</span>
              ) : null}
            </div>
          ) : null}
        </div>
        <ul className="dg-donut__legend">
          {segments.map((seg, i) => (
            <li key={i} className="dg-donut__legend-row">
              <span
                className={`dg-donut__swatch dg-series--${seg.tone ?? TONES[i % TONES.length]}`}
              />
              <span className="dg-donut__legend-label">{seg.label}</span>
              {seg.valueLabel != null ? (
                <span className="dg-donut__legend-value">{seg.valueLabel}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  )
}

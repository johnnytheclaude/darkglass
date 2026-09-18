import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { ChartCard } from './ChartCard'

export interface BarChartVerticalBar {
  /** Popisek pod sloupcem (měsíc, den, hodina). */
  label: ReactNode
  value: number
  /** Hodnota v bublině nad sloupcem; ukáže se jen u vyzdviženého sloupce. */
  valueLabel?: ReactNode
  /** Vyzdvižený sloupec — v návrhu poslední (aktuální) období. */
  highlight?: boolean
}

export interface BarChartVerticalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  bars: BarChartVerticalBar[]
  /** Popisky osy odshora dolů; bez nich se osa nevykreslí. */
  ticks?: ReactNode[]
  /** Horní hranice osy. Bez ní se bere největší hodnota v datech. */
  max?: number
  /**
   * Po kolikátém sloupci se na úzké kartě kreslí popisek osy. Bez něj se
   * odvodí z počtu sloupců: řada hodin (0–18) se na telefonu naředí na
   * každou třetí, aby se popisky neosekávaly ani nepřekrývaly. Na široké
   * kartě se neředí — tam se vejdou všechny.
   */
  labelStride?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Chart / Bars Vertical — svislé sloupce s osou. Sloupce se dělí o dostupnou
 * šířku, takže se graf vejde i do úzké karty; osa drží vlevo.
 */
export function BarChartVertical({
  title,
  subtitle,
  bars,
  ticks,
  max,
  labelStride,
  className,
  ...rest
}: BarChartVerticalProps) {
  const top = max ?? Math.max(1, ...bars.map((b) => b.value))
  const classes = ['dg-bars-v', className].filter(Boolean).join(' ')
  const stride = labelStride ?? autoLabelStride(bars.length)

  return (
    <ChartCard
      className={classes}
      title={title}
      subtitle={subtitle}
      data-label-stride={stride > 1 ? stride : undefined}
      {...rest}
    >
      <div className="dg-bars-v__plot">
        {ticks && ticks.length > 0 ? (
          <div className="dg-bars-v__axis" aria-hidden="true">
            {ticks.map((tick, i) => (
              <span key={i} className="dg-bars-v__tick">
                {tick}
              </span>
            ))}
          </div>
        ) : null}
        <div className="dg-bars-v__bars">
          {bars.map((bar, i) => (
            <div key={i} className="dg-bars-v__col">
              {bar.highlight && bar.valueLabel != null ? (
                <span className="dg-bars-v__tooltip">{bar.valueLabel}</span>
              ) : null}
              <span
                className={
                  bar.highlight ? 'dg-bars-v__bar dg-bars-v__bar--on' : 'dg-bars-v__bar'
                }
                style={{ height: `${Math.max(0, Math.min(100, (bar.value / top) * 100))}%` }}
              />
              <span
                className={
                  bar.highlight ? 'dg-bars-v__label dg-bars-v__label--on' : 'dg-bars-v__label'
                }
              >
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

/**
 * Kolikátý popisek se na úzké kartě kreslí. Počítá se z počtu sloupců: do
 * sedmi se vejdou vždy, dál se ředí tak, aby jich na telefonu zbylo nejvýš
 * sedm. CSS umí stride 2, 3 a 4 — proto ten strop.
 */
function autoLabelStride(count: number): number {
  if (count >= 25) return 4
  if (count >= 13) return 3
  if (count >= 8) return 2
  return 1
}

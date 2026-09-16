import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { ChartCard } from './ChartCard'

export interface SparkbarsBar {
  value: number
  /** Vyzdvižený sloupec — v návrhu špičky dne. */
  highlight?: boolean
  /** Co sloupec znamená (hodina), jde do title. */
  label?: string
}

export interface SparkbarsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  bars: SparkbarsBar[]
  /**
   * Popisky osy pod sloupci — rozprostřou se po šířce grafu. Hodí se, když
   * sloupců je víc, než kolik snese popisek u každého (hodiny dne na telefonu:
   * čtyři popisky stačí, dvacet čtyři by se slilo). Bez nich se osa nekreslí.
   */
  axis?: ReactNode[]
  max?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Chart / Sparkbars — malý graf v kartě. Bez osy a bez legendy: ukazuje jen
 * tvar dne, špičky jsou v akcentu.
 */
export function Sparkbars({ title, subtitle, bars, axis, max, className, ...rest }: SparkbarsProps) {
  const top = max ?? Math.max(1, ...bars.map((b) => b.value))
  const classes = ['dg-sparkbars', className].filter(Boolean).join(' ')

  return (
    <ChartCard className={classes} title={title} subtitle={subtitle} {...rest}>
      <div className="dg-sparkbars__bars">
        {bars.map((bar, i) => (
          <span
            key={i}
            className={bar.highlight ? 'dg-sparkbars__bar dg-sparkbars__bar--on' : 'dg-sparkbars__bar'}
            style={{ height: `${Math.max(0, Math.min(100, (bar.value / top) * 100))}%` }}
            title={bar.label}
          />
        ))}
      </div>
      {axis && axis.length > 0 ? (
        <div className="dg-sparkbars__axis" aria-hidden="true">
          {axis.map((tick, i) => (
            <span key={i} className="dg-sparkbars__tick">
              {tick}
            </span>
          ))}
        </div>
      ) : null}
    </ChartCard>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface FunnelStep {
  label: ReactNode
  value: number
  /** Co stojí vpravo od popisku; bez něj se doplní podíl v procentech. */
  display?: ReactNode
}

export interface FunnelChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  steps: FunnelStep[]
  /** Kolik je 100 %; bez něj se bere první (největší) krok. */
  max?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Trychtýř — § Data · rozšíření. Kroky procesu pod sebou, pruh se zkracuje
 * a zesvětluje podle toho, kolik lidí došlo dál.
 */
export function FunnelChart({ title, steps, max, className, ...rest }: FunnelChartProps) {
  const classes = ['dg-funnel', className].filter(Boolean).join(' ')
  const top = max ?? Math.max(1, ...steps.map((step) => step.value))

  return (
    <div className={classes} {...rest}>
      {title != null ? <span className="dg-funnel__title">{title}</span> : null}
      {steps.map((step, i) => {
        const ratio = Math.max(0, Math.min(1, step.value / top))
        return (
          <div className="dg-funnel__step" key={i}>
            <span className="dg-funnel__top">
              <span className="dg-funnel__label">{step.label}</span>
              <span className="dg-funnel__value">
                {step.display ?? `${Math.round(ratio * 100)} %`}
              </span>
            </span>
            {/* Pruh nemizí docela — i poslední krok musí zůstat čitelný, proto
                nejnižší krytí 0,4 a zbytek podle podílu (poměry z návrhu). */}
            <span
              className="dg-funnel__bar"
              style={{ width: `${ratio * 100}%`, opacity: 0.4 + 0.6 * ratio }}
            />
          </div>
        )
      })}
    </div>
  )
}

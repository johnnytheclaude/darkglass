import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface MiniBar {
  /** Popisek pod sloupcem (období, kategorie). */
  label: ReactNode
  value: number
  /** Hodnota nad sloupcem; bez ní se číslo nekreslí. */
  valueLabel?: ReactNode
}

export interface MiniBarsProps extends HTMLAttributes<HTMLDivElement> {
  bars: MiniBar[]
  /** Horní hranice osy. Bez ní se bere největší hodnota v datech. */
  max?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Chart / Mini Bars — nízké sloupce s hodnotou nad sloupcem a popiskem pod ním.
 * Na rozdíl od `BarChartVertical` nemá osu ani vlastní kartu: vejde se do karty
 * vedle textu, takže se hodí na rozpad jedné veličiny do několika pásem.
 * Prázdné pásmo zůstává vidět jako tenká stopa, aby se sloupce daly počítat.
 */
export function MiniBars({ bars, max, className, ...rest }: MiniBarsProps) {
  const top = max ?? Math.max(1, ...bars.map((bar) => bar.value))
  const classes = ['dg-mini-bars', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {bars.map((bar, index) => {
        const on = bar.value > 0
        return (
          <div key={index} className="dg-mini-bars__col">
            {bar.valueLabel != null ? (
              <span
                className={
                  on ? 'dg-mini-bars__value dg-mini-bars__value--on' : 'dg-mini-bars__value'
                }
              >
                {bar.valueLabel}
              </span>
            ) : null}
            <span className="dg-mini-bars__track">
              <span
                className={on ? 'dg-mini-bars__bar dg-mini-bars__bar--on' : 'dg-mini-bars__bar'}
                style={{ height: `${Math.max(0, Math.min(100, (bar.value / top) * 100))}%` }}
              />
            </span>
            <span className="dg-mini-bars__label">{bar.label}</span>
          </div>
        )
      })}
    </div>
  )
}

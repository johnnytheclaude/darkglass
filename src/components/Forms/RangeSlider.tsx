import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface RangeSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: ReactNode
  /** Popis vybraného rozsahu („2 000 – 8 000 Kč“); formátuje ho aplikace. */
  valueLabel?: ReactNode
  min?: number
  max?: number
  step?: number
  /** Dolní a horní mez výběru. */
  value: [number, number]
  onChange?: (value: [number, number]) => void
  disabled?: boolean
  /** Popisky táhel pro čtečku. */
  fromLabel?: string
  toLabel?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Rozsah se dvěma táhly (cena od–do). Táhla jsou dvě skutečná posuvná pole,
 * takže fungují myší, prstem i šipkami na klávesnici; přes sebe se nepřehodí.
 */
export function RangeSlider({
  label,
  valueLabel,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  disabled = false,
  fromLabel = 'Od',
  toLabel = 'Do',
  className,
  ...rest
}: RangeSliderProps) {
  const [from, to] = value
  const span = max - min || 1
  const left = ((from - min) / span) * 100
  const right = ((to - min) / span) * 100

  return (
    <div
      className={['dg-range', disabled ? 'is-disabled' : null, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {label != null || valueLabel != null ? (
        <div className="dg-range__top">
          {label != null ? <span className="dg-range__label">{label}</span> : null}
          {valueLabel != null ? <span className="dg-range__value">{valueLabel}</span> : null}
        </div>
      ) : null}
      <div className="dg-range__track">
        <span
          className="dg-range__fill"
          style={{ left: `${left}%`, width: `${Math.max(0, right - left)}%` }}
        />
        <input
          type="range"
          className="dg-range__input"
          min={min}
          max={max}
          step={step}
          value={from}
          disabled={disabled}
          aria-label={fromLabel}
          onChange={(event) => onChange?.([Math.min(Number(event.target.value), to), to])}
        />
        <input
          type="range"
          className="dg-range__input"
          min={min}
          max={max}
          step={step}
          value={to}
          disabled={disabled}
          aria-label={toLabel}
          onChange={(event) => onChange?.([from, Math.max(Number(event.target.value), from)])}
        />
      </div>
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: ReactNode
  /** Hodnota vpravo nad dráhou („70 %“); formátuje ji aplikace. */
  valueLabel?: ReactNode
  min?: number
  max?: number
  step?: number
  value: number
  onChange?: (value: number) => void
  disabled?: boolean
  /**
   * Dráha s barevným přechodem (intenzita, teplota) místo jednobarevné
   * výplně — návrh ji používá tam, kde je stupnice sama nositelem významu.
   */
  gradient?: boolean
  /** Popisek táhla pro čtečku, když komponenta nemá viditelný `label`. */
  inputLabel?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Posuvník s jednou hodnotou. Táhlo je skutečné `input[type=range]`, takže
 * jede myší, prstem i šipkami; dráhu pod ním kreslí CSS podle návrhu.
 */
export function Slider({
  label,
  valueLabel,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  disabled = false,
  gradient = false,
  inputLabel,
  className,
  ref,
  ...rest
}: SliderProps) {
  const span = max - min || 1
  const filled = ((value - min) / span) * 100

  return (
    <div
      className={[
        'dg-slider',
        gradient ? 'dg-slider--gradient' : null,
        disabled ? 'is-disabled' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {label != null || valueLabel != null ? (
        <div className="dg-slider__top">
          {label != null ? <span className="dg-slider__label">{label}</span> : null}
          {valueLabel != null ? <span className="dg-slider__value">{valueLabel}</span> : null}
        </div>
      ) : null}
      <div className="dg-slider__track">
        {gradient ? null : (
          <span className="dg-slider__fill" style={{ width: `${Math.max(0, Math.min(100, filled))}%` }} />
        )}
        <input
          ref={ref}
          type="range"
          className="dg-slider__input"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-label={inputLabel}
          onChange={(event) => onChange?.(Number(event.target.value))}
        />
      </div>
    </div>
  )
}

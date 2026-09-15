import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconStar } from '../Icons/IconStar'

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Hodnocení 0–`max`; půlhvězdy návrh nezná, zaokrouhluje se nahoru při kreslení. */
  value: number
  max?: number
  /** Bez handleru je hodnocení jen ke čtení (výpis, report). */
  onChange?: (value: number) => void
  /** Číslo za hvězdami; `false` ho schová. */
  valueLabel?: ReactNode | false
  size?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Hodnocení hvězdami. Ke čtení je to prostý text pro čtečku, k zadání skupina
 * přepínačů — klikat se dá i klávesnicí.
 */
export function Rating({
  value,
  max = 5,
  onChange,
  valueLabel,
  size = 24,
  className,
  ...rest
}: RatingProps) {
  const classes = ['dg-rating', className].filter(Boolean).join(' ')
  const shown = valueLabel === false ? null : (valueLabel ?? value.toLocaleString('cs-CZ'))

  return (
    <div
      className={classes}
      role={onChange ? 'radiogroup' : 'img'}
      aria-label={onChange ? 'Hodnocení' : `Hodnocení ${value} z ${max}`}
      {...rest}
    >
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1
        const filled = star <= Math.round(value)

        if (!onChange) {
          return (
            <IconStar key={star} size={size} filled={filled} className="dg-rating__star" />
          )
        }

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === Math.round(value)}
            aria-label={`${star} z ${max}`}
            className="dg-rating__btn"
            onClick={() => onChange(star)}
          >
            <IconStar size={size} filled={filled} className="dg-rating__star" />
          </button>
        )
      })}
      {shown != null ? <span className="dg-rating__value">{shown}</span> : null}
    </div>
  )
}

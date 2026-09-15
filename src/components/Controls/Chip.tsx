import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'
import { IconX } from '../Icons/IconX'

export type ChipTone = 'neutral' | 'accent' | 'purple' | 'success' | 'warning' | 'danger'

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Vybraný filtr — plná barva tónu a bílý popisek. */
  selected?: boolean
  tone?: ChipTone
  /** Počet v odznaku za popiskem („Ve frontě 4“). */
  count?: ReactNode
  /** Ikona před popiskem. */
  icon?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

/**
 * Štítek a filtr — vybraný / nevybraný / s počítadlem. Je to tlačítko: filtr
 * se zapíná kliknutím a stav nese `aria-pressed`.
 */
export function Chip({
  selected = false,
  tone = 'neutral',
  count,
  icon,
  type = 'button',
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      className={[
        'dg-chip',
        `dg-chip--${tone}`,
        selected ? 'is-selected' : null,
        count != null ? 'dg-chip--counter' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-pressed={selected}
      {...rest}
    >
      {icon ? (
        <span className="dg-chip__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-chip__label">{children}</span>
      {count != null ? <span className="dg-chip__count">{count}</span> : null}
    </button>
  )
}

export interface RemovableChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: ChipTone
  onRemove?: () => void
  /** Popis křížku pro čtečku; výchozí „Odebrat“. */
  removeLabel?: string
  ref?: Ref<HTMLSpanElement>
}

/**
 * Odstranitelný štítek (zvolený filtr nad seznamem). Má vlastní komponentu,
 * protože křížek je samostatné tlačítko — do tlačítka `Chip` by se vnořit
 * nesmělo.
 */
export function RemovableChip({
  tone = 'purple',
  onRemove,
  removeLabel = 'Odebrat',
  className,
  children,
  ...rest
}: RemovableChipProps) {
  return (
    <span
      className={['dg-chip', 'dg-chip--static', `dg-chip--${tone}`, 'dg-chip--removable', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="dg-chip__label">{children}</span>
      <button type="button" className="dg-chip__remove" onClick={onRemove} aria-label={removeLabel}>
        <IconX size={12} />
      </button>
    </span>
  )
}

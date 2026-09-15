import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ProgressTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

export interface ProgressRowProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  /** Hotová hodnota vpravo („5 ze 7", „2 doklady"). */
  value?: ReactNode
  /** Naplnění v procentech (0–100). */
  percent?: number
  tone?: ProgressTone
  ref?: Ref<HTMLDivElement>
}

/** Řádek s popiskem, hodnotou a pruhem. Používá se v kartě s akcí v hlavičce. */
export function ProgressRow({
  label,
  value,
  percent = 0,
  tone = 'accent',
  className,
  ...rest
}: ProgressRowProps) {
  const pct = Math.max(0, Math.min(100, percent))
  const classes = ['dg-progress-row', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="dg-progress-row__top">
        {label != null ? <span className="dg-progress-row__label">{label}</span> : null}
        {value != null ? <span className="dg-progress-row__value">{value}</span> : null}
      </div>
      <span className="dg-progress-row__track">
        <span
          className={`dg-progress-row__fill dg-progress-row__fill--${tone}`}
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  )
}

export interface HeaderActionCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  /** Popisek akce v hlavičce; bez něj se tlačítko nevykreslí. */
  actionLabel?: ReactNode
  onAction?: () => void
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Card / S akcí — karta, která má akci hned v hlavičce. V úzkém místě se akce
 * zalomí pod titulek, nikdy se nezkrátí.
 */
export function HeaderActionCard({
  title,
  actionLabel,
  onAction,
  children,
  className,
  ...rest
}: HeaderActionCardProps) {
  const classes = ['dg-header-action-card', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="dg-header-action-card__head">
        {title != null ? <span className="dg-header-action-card__title">{title}</span> : null}
        {actionLabel != null ? (
          <button type="button" className="dg-header-action-card__action" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
      {children}
    </div>
  )
}

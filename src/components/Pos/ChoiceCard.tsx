import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'

export interface ChoiceCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** Název volby („Výměna“, „Vrátit peníze“). */
  title: ReactNode
  /** Vysvětlení pod názvem — co se stane, když obsluha volbu zvolí. */
  description?: ReactNode
  /** Vybraná volba nese akcent. */
  selected?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * Choice Card — velká volba na dotyk (druh vratky, způsob doručení účtenky).
 * Je to tlačítko, ne div: jde na něj tabulátorem a čtečka přečte stav výběru.
 */
export function ChoiceCard({
  title,
  description,
  selected = false,
  type = 'button',
  className,
  ...rest
}: ChoiceCardProps) {
  const classes = ['dg-choice-card', selected ? 'is-selected' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} aria-pressed={selected} {...rest}>
      <span className="dg-choice-card__title">{title}</span>
      {description != null ? (
        <span className="dg-choice-card__desc">{description}</span>
      ) : null}
    </button>
  )
}

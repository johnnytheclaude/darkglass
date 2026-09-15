import type { ButtonHTMLAttributes, Ref } from 'react'

export interface CategoryChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Vybraná kategorie — plný akcent. */
  selected?: boolean
  ref?: Ref<HTMLButtonElement>
}

/**
 * Chip / Kategorie — přepínač kategorie nad dlaždicemi zboží.
 * Výška 48 px, aby se dal trefit prstem i na dotykovém displeji.
 */
export function CategoryChip({
  selected = false,
  type = 'button',
  className,
  children,
  ...rest
}: CategoryChipProps) {
  const classes = ['dg-category-chip', selected ? 'is-selected' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} aria-pressed={selected} {...rest}>
      {children}
    </button>
  )
}

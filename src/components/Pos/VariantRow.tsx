import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface VariantRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Popis varianty („vel. 50“, „modrá“). */
  variant: ReactNode
  /** Množství na skladě („2 ks“). */
  count: ReactNode
  /** Poznámka u zvýrazněného řádku („právě pípnuto“). */
  note?: ReactNode
  /** Zvýrazněná varianta — Row / Varianta Aktivní z návrhu. */
  active?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * Row / Varianta — dostupnost varianty zboží po pípnutí.
 * Běžná varianta je ztlumená, aktivní (právě pípnutá) nese akcent.
 */
export function VariantRow({
  variant,
  count,
  note,
  active = false,
  className,
  ...rest
}: VariantRowProps) {
  const classes = ['dg-variant-row', active ? 'is-active' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      <span className="dg-variant-row__variant">{variant}</span>
      {note != null ? <span className="dg-variant-row__note">{note}</span> : null}
      <span className="dg-variant-row__count">{count}</span>
    </div>
  )
}

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface VariantRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Popis varianty („vel. 50“, „modrá“). */
  variant: ReactNode
  /** Množství na skladě („2 ks“). Vynechá se u řádku, kde místo počtu stojí akce. */
  count?: ReactNode
  /** Poznámka u zvýrazněného řádku („právě pípnuto“). */
  note?: ReactNode
  /**
   * Akce v řádku („Objednat“) — stojí vpravo, tedy tam, kde jinak počet.
   * Je-li vyplněný i `count`, sedí akce za ním (task #850).
   */
  action?: ReactNode
  /**
   * Barevné odlišení řádku: `danger` = varianta, která není skladem.
   * Stav nikdy nesmí nést jen barva — popisek akce a `aria-label` řádku ho
   * musí říct slovy (task #850).
   */
  tone?: 'default' | 'danger'
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
  action,
  tone = 'default',
  active = false,
  className,
  ...rest
}: VariantRowProps) {
  const classes = [
    'dg-variant-row',
    tone === 'danger' ? 'dg-variant-row--danger' : null,
    active ? 'is-active' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      <span className="dg-variant-row__variant">{variant}</span>
      {note != null ? <span className="dg-variant-row__note">{note}</span> : null}
      {count != null ? <span className="dg-variant-row__count">{count}</span> : null}
      {action != null ? <span className="dg-variant-row__action">{action}</span> : null}
    </div>
  )
}

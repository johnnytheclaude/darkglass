import type { HTMLAttributes, ReactNode, Ref } from 'react'

/** Ladění kolečka s ikonou podle toho, jak akce dopadla. */
export type ResultPanelTone = 'success' | 'danger' | 'warning' | 'accent' | 'neutral'

export interface ResultPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Ikona v kolečku nad nadpisem — znak výsledku, ne dekorace. */
  icon?: ReactNode
  /** Barva kolečka podle toho, jak to dopadlo. */
  tone?: ResultPanelTone
  /** Co se stalo, jedním slovem nebo krátkou větou („Zaplaceno“). */
  title: ReactNode
  /** Řádek pod nadpisem — identita dokladu, typ, způsob platby. */
  meta?: ReactNode
  /** Hutnější rytmus pro stav, který nese víc obsahu (kód na displeji). */
  compact?: boolean
  /** Obsah panelu pod hlavičkou: částka, stav tisku, akce. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Panel / Výsledek — konec úlohy na celou plochu (zaplaceno, účtenka nevyjela).
 * Nadpis je největší text obrazovky, protože obsluha ho čte od zákazníka;
 * pod ním stojí jen to, o čem se ještě rozhoduje. Panel má pevnou šířku
 * čitelného sloupce a zbytek plochy nechává prázdný — je to konec, ne formulář.
 */
export function ResultPanel({ icon, tone = 'success', title, meta, compact = false, className, children, ...rest }: ResultPanelProps) {
  const classes = ['dg-result-panel', `dg-result-panel--${tone}`, compact ? 'dg-result-panel--compact' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {icon != null ? (
        <span className="dg-result-panel__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className="dg-result-panel__head">
        <span className="dg-result-panel__title">{title}</span>
        {meta != null ? <span className="dg-result-panel__meta">{meta}</span> : null}
      </div>
      {children != null ? <div className="dg-result-panel__body">{children}</div> : null}
    </div>
  )
}

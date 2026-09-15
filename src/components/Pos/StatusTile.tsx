import type { HTMLAttributes, ReactNode, Ref } from 'react'

/** Ladění dlaždice podle toho, jak zařízení odpovědělo. */
export type StatusTileTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

export interface StatusTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Ikona v dlaždici vlevo (tiskárna, terminál, obálka). */
  icon?: ReactNode
  /** Barva dlaždice podle závažnosti; výchozí je tichá. */
  tone?: StatusTileTone
  /** Co se děje („Účtenka se tiskne“). */
  title: ReactNode
  /** Technický údaj pod tím — zařízení, čas, důvod. */
  sub?: ReactNode
  /** Akce vpravo (tlačítko nebo textový odkaz); bez ní řádek jen informuje. */
  action?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Row / Stav zařízení — pruh se stavem úlohy uvnitř panelu (tisk účtenky,
 * odeslání e-mailu). Nese vždy dvě věci: co se děje a na čem — bez zařízení
 * a času se stav nedá ověřit u tiskárny, která výsledek sama nehlásí.
 */
export function StatusTile({ icon, tone = 'neutral', title, sub, action, className, ...rest }: StatusTileProps) {
  const classes = ['dg-status-tile', `dg-status-tile--${tone}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {icon != null ? (
        <span className="dg-status-tile__tile" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-status-tile__text">
        <span className="dg-status-tile__title">{title}</span>
        {sub != null ? <span className="dg-status-tile__sub">{sub}</span> : null}
      </span>
      {action != null ? <span className="dg-status-tile__action">{action}</span> : null}
    </div>
  )
}

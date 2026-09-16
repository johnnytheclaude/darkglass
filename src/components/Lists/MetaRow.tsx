import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type MetaRowTone = 'ok' | 'warning' | 'danger' | 'accent' | 'neutral'

export interface MetaRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Název položky. */
  title: ReactNode
  /** Druhý řádek — čísla, podmínka, průběh. */
  sub?: ReactNode
  /** Stav vpravo („aktivní“, „skončila“); drží se na jednom řádku. */
  status?: ReactNode
  /** Barva stavu; výchozí je ztlumená. */
  tone?: MetaRowTone
  ref?: Ref<HTMLDivElement>
}

/**
 * Row / Údaj se stavem — dvouřádkový text vlevo, stavový text vpravo. Řádek
 * do karty (přehled kampaní, výčet stavů); plochu ani obrys nemá, ty nese
 * karta. Na úzkém místě se stav zalomí pod text, ať se nikdy neuřízne.
 */
export function MetaRow({ title, sub, status, tone = 'neutral', className, ...rest }: MetaRowProps) {
  const classes = ['dg-meta-row', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <span className="dg-meta-row__text">
        <span className="dg-meta-row__title">{title}</span>
        {sub != null ? <span className="dg-meta-row__sub">{sub}</span> : null}
      </span>
      {status != null ? (
        <span className={`dg-meta-row__status dg-meta-row__status--${tone}`}>{status}</span>
      ) : null}
    </div>
  )
}

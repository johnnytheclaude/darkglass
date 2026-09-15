import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface DialogActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Nevratná akce (Odstranit, Stornovat). Stojí sama vlevo, s mezerou. */
  destructive?: ReactNode
  /** Zrušit a hlavní akce — vpravo dole, v pořadí návrhu. */
  children?: ReactNode
  /** Dotykové cíle: akce dostanou výšku 52 px a větší rozestup. */
  touch?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * Patka dialogu. Drží jediné pravidlo, které se u dialogů nejčastěji poruší:
 * **destruktivní akce nikdy nesousedí s primární**. Nevratná akce stojí sama
 * u levé hrany, potvrzení u pravé; na úzkém okně se patka srovná do sloupce
 * tak, že hlavní akce je nahoře a nevratná úplně dole — mezi nimi vždy zůstane
 * Zrušit. Potvrzení nevratné akce řeší `ConfirmDialog`, tohle je jen rozvržení.
 */
export function DialogActions({
  destructive,
  children,
  touch = false,
  className,
  ...rest
}: DialogActionsProps) {
  const classes = ['dg-dialog-actions', touch ? 'dg-dialog-actions--touch' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {destructive != null ? (
        <div className="dg-dialog-actions__destructive">{destructive}</div>
      ) : null}
      <div className="dg-dialog-actions__main">{children}</div>
    </div>
  )
}

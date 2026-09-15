import type { HTMLAttributes, ReactNode, Ref } from 'react'

/**
 * Pruh zákazníka nad součtem účtu (§ Pokladna · prodej, artboardy 01 a 02).
 * Prázdný stav vyzývá „Připnout zákazníka" se zkratkou, připnutý stav ukazuje
 * jméno a pod ním úroveň se slevou.
 *
 * Karta je `div`, ne `button` — vedle hlavní akce může stát ještě druhá
 * (odběratel / firma) a tlačítko uvnitř tlačítka není platné HTML.
 */
export interface CustomerBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Ikona vlevo. */
  icon?: ReactNode
  /** Hlavní popisek — výzva, nebo jméno připnutého zákazníka. */
  label: ReactNode
  /** Druhý řádek pod popiskem (úroveň věrnosti, sleva). */
  meta?: ReactNode
  /** Klávesová zkratka vpravo. */
  shortcut?: ReactNode
  /** Klepnutí na hlavní plochu. Bez něj je pruh jen popisný. */
  onSelect?: () => void
  /** Doplňková akce vpravo (typicky odběratel „Na firmu"). */
  action?: ReactNode
  /** Zvýraznění, že zákazník je připnutý. */
  pinned?: boolean
  ref?: Ref<HTMLDivElement>
}

export function CustomerBar({
  icon,
  label,
  meta,
  shortcut,
  onSelect,
  action,
  pinned = false,
  className,
  ...rest
}: CustomerBarProps) {
  const classes = ['dg-customer-bar', pinned ? 'is-pinned' : null, className]
    .filter(Boolean)
    .join(' ')

  const obsah = (
    <>
      {icon != null ? (
        <span className="dg-customer-bar__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-customer-bar__text">
        <span className="dg-customer-bar__label">{label}</span>
        {meta != null ? <span className="dg-customer-bar__meta">{meta}</span> : null}
      </span>
      {shortcut != null ? <span className="dg-customer-bar__shortcut">{shortcut}</span> : null}
    </>
  )

  return (
    <div className={classes} {...rest}>
      {onSelect ? (
        <button type="button" className="dg-customer-bar__main" onClick={onSelect}>
          {obsah}
        </button>
      ) : (
        <span className="dg-customer-bar__main">{obsah}</span>
      )}
      {action != null ? <span className="dg-customer-bar__action">{action}</span> : null}
    </div>
  )
}

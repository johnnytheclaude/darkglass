import type { ElementType, HTMLAttributes, ReactNode, Ref } from 'react'
import { IconArrowLeft } from '../Icons/IconArrowLeft'

export type PageHeaderSize = 'm' | 's'

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tlačítko zpět se ukáže, jakmile je co dělat po kliknutí. */
  onBack?: () => void
  /**
   * Cíl šipky zpět jako odkaz — pro stránky vykreslené na serveru, kde není
   * komu předat `onBack`. Vykreslí `<a>`, takže funguje i bez JavaScriptu.
   */
  backHref?: string
  /**
   * Čím se šipka zpět vykreslí, je-li `backHref`. Výchozí `a`; aplikace
   * s routerem sem předá svůj `Link`.
   */
  backAs?: ElementType
  backLabel?: string
  title?: ReactNode
  /** Kde jsme a co se stalo naposledy. */
  subtitle?: ReactNode
  /** Tlačítka vpravo. */
  actions?: ReactNode
  /**
   * Prvek nadpisu. Hlavička stránky bývá jejím jediným nadpisem, takže
   * výchozí `h1` — čtečka i osnova stránky ho potřebují. Uvnitř karty nebo
   * panelu se předá `h2`, případně `span`, když nadpis stránky nese někdo jiný.
   */
  titleAs?: 'h1' | 'h2' | 'h3' | 'span'
  /**
   * Velikost hlavičky. `m` (výchozí) je nadpis obrazovky na desktopu a na
   * vstupních obrazovkách telefonu — 26 px. `s` je pracovní hlavička
   * telefonu z návrhu mobilu (19 px nadpis, 12,5 px popisek): obsah obrazovky
   * je důležitější než její jméno, tak ji návrh drží nízkou.
   */
  size?: PageHeaderSize
  ref?: Ref<HTMLDivElement>
}

/**
 * Hlavička stránky — § Navigace · rozšíření. Šipka zpět, nadpis s popiskem
 * a akce vpravo. Na úzké šířce se akce zalomí pod nadpis.
 */
export function PageHeader({
  onBack,
  backHref,
  backAs,
  backLabel = 'Zpět',
  title,
  subtitle,
  actions,
  titleAs: TitleTag = 'h1',
  size = 'm',
  className,
  ...rest
}: PageHeaderProps) {
  const classes = ['dg-page-header', size === 's' && 'dg-page-header--s', className]
    .filter(Boolean)
    .join(' ')
  const BackLink: ElementType = backAs ?? 'a'

  return (
    <div className={classes} {...rest}>
      {backHref != null ? (
        <BackLink className="dg-page-header__back" href={backHref} aria-label={backLabel}>
          <IconArrowLeft />
        </BackLink>
      ) : onBack ? (
        <button className="dg-page-header__back" type="button" aria-label={backLabel} onClick={onBack}>
          <IconArrowLeft />
        </button>
      ) : null}
      <div className="dg-page-header__titles">
        {title != null ? <TitleTag className="dg-page-header__title">{title}</TitleTag> : null}
        {subtitle != null ? <span className="dg-page-header__sub">{subtitle}</span> : null}
      </div>
      {actions != null ? <div className="dg-page-header__actions">{actions}</div> : null}
    </div>
  )
}

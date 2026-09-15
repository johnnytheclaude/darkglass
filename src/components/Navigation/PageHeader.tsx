import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconArrowLeft } from '../Icons/IconArrowLeft'

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tlačítko zpět se ukáže, jakmile je co dělat po kliknutí. */
  onBack?: () => void
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
  ref?: Ref<HTMLDivElement>
}

/**
 * Hlavička stránky — § Navigace · rozšíření. Šipka zpět, nadpis s popiskem
 * a akce vpravo. Na úzké šířce se akce zalomí pod nadpis.
 */
export function PageHeader({
  onBack,
  backLabel = 'Zpět',
  title,
  subtitle,
  actions,
  titleAs: TitleTag = 'h1',
  className,
  ...rest
}: PageHeaderProps) {
  const classes = ['dg-page-header', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {onBack ? (
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

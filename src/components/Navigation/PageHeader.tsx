import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconChevronLeft } from '../Icons/IconChevronLeft'

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tlačítko zpět se ukáže, jakmile je co dělat po kliknutí. */
  onBack?: () => void
  backLabel?: string
  title?: ReactNode
  /** Kde jsme a co se stalo naposledy. */
  subtitle?: ReactNode
  /** Tlačítka vpravo. */
  actions?: ReactNode
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
  className,
  ...rest
}: PageHeaderProps) {
  const classes = ['dg-page-header', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {onBack ? (
        <button className="dg-page-header__back" type="button" aria-label={backLabel} onClick={onBack}>
          <IconChevronLeft />
        </button>
      ) : null}
      <div className="dg-page-header__titles">
        {title != null ? <span className="dg-page-header__title">{title}</span> : null}
        {subtitle != null ? <span className="dg-page-header__sub">{subtitle}</span> : null}
      </div>
      {actions != null ? <div className="dg-page-header__actions">{actions}</div> : null}
    </div>
  )
}

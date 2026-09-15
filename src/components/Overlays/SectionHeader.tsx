import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  /** Upřesnění pod nadpisem („Za posledních 7 dní“). */
  subtitle?: ReactNode
  /** Akce vpravo — odkaz „Zobrazit vše ›“ nebo tlačítko. */
  action?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Nadpis sekce s akcí vpravo. Akce sedí na účaří nadpisu; na úzkém okně se
 * zalomí pod něj, aby se popisek nikdy neuřízl.
 */
export function SectionHeader({ title, subtitle, action, className, ...rest }: SectionHeaderProps) {
  return (
    <div className={['dg-section-header', className].filter(Boolean).join(' ')} {...rest}>
      <div className="dg-section-header__titles">
        <span className="dg-section-header__title">{title}</span>
        {subtitle != null ? <span className="dg-section-header__sub">{subtitle}</span> : null}
      </div>
      {action != null ? <div className="dg-section-header__action">{action}</div> : null}
    </div>
  )
}

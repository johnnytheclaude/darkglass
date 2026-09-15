import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ErrorPageTone = 'danger' | 'warning' | 'accent'

export interface ErrorPageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Kód chyby velkým písmem (404, 500). Bez něj se řádek vynechá. */
  code?: ReactNode
  /** Co se stalo, jednou větou. */
  title: ReactNode
  /** Proč se to stalo a co s tím — text pod nadpisem. */
  children?: ReactNode
  /** Ikona v kolečku nad kódem. */
  icon?: ReactNode
  /** Ladění kolečka s ikonou. */
  tone?: ErrorPageTone
  /** Jediná akce, kterou člověk má — typicky Zpět na úvod. */
  action?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Error Page — chybová stránka. Jedna cesta zpět, žádné technické detaily;
 * text je vystředěný a karta nikdy nepřeteče přes úzkou obrazovku.
 */
export function ErrorPage({
  code,
  title,
  children,
  icon,
  tone = 'danger',
  action,
  className,
  ...rest
}: ErrorPageProps) {
  const classes = ['dg-error-page', `dg-error-page--${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="alert" {...rest}>
      {icon != null ? <span className="dg-error-page__icon">{icon}</span> : null}
      {code != null ? <div className="dg-error-page__code">{code}</div> : null}
      <div className="dg-error-page__title">{title}</div>
      {children != null ? <div className="dg-error-page__body">{children}</div> : null}
      {action != null ? <div className="dg-error-page__action">{action}</div> : null}
    </div>
  )
}

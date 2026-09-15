import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface BreadcrumbItem {
  key: string
  label: ReactNode
  /** Odkaz na nadřazenou obrazovku; bez něj je z drobečku tlačítko. */
  href?: string
  onClick?: () => void
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Cesta odshora dolů; poslední položka je obrazovka, na které stojím. */
  items: BreadcrumbItem[]
  label?: string
  ref?: Ref<HTMLElement>
}

/**
 * Nav / Drobečková navigace — § Navigace. Poslední drobeček je tučný a není
 * odkaz: na obrazovku, kde stojím, se neproklikává.
 */
export function Breadcrumbs({
  items,
  label = 'Drobečková navigace',
  className,
  ...rest
}: BreadcrumbsProps) {
  return (
    <nav
      className={['dg-breadcrumbs', className].filter(Boolean).join(' ')}
      aria-label={label}
      {...rest}
    >
      <ol className="dg-breadcrumbs__list">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.key} className="dg-breadcrumbs__item">
              {i > 0 ? (
                <span className="dg-breadcrumbs__sep" aria-hidden="true">
                  ›
                </span>
              ) : null}
              {last ? (
                <span className="dg-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : item.href != null ? (
                <a className="dg-breadcrumbs__link" href={item.href} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : (
                <button type="button" className="dg-breadcrumbs__link" onClick={item.onClick}>
                  {item.label}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

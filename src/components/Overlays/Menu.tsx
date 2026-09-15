import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Popis nabídky pro čtečku („Akce položky“). */
  label?: string
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Rozbalovací nabídka — neprůhledná karta s položkami. Kam se umístí (pod
 * tlačítko, k prstu) řeší aplikace; knihovna nemá vlastní ukotvení ani portál.
 */
export function Menu({ label, className, children, ...rest }: MenuProps) {
  return (
    <div
      className={['dg-menu', className].filter(Boolean).join(' ')}
      role="menu"
      aria-label={label}
      {...rest}
    >
      {children}
    </div>
  )
}

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  /** Zvýrazněná položka (najetá nebo právě platná). */
  active?: boolean
  /** Nevratná akce — popisek v červené. */
  danger?: boolean
  ref?: Ref<HTMLButtonElement>
}

/** Položka nabídky. */
export function MenuItem({
  icon,
  active = false,
  danger = false,
  type = 'button',
  className,
  children,
  ...rest
}: MenuItemProps) {
  return (
    <button
      type={type}
      role="menuitem"
      className={[
        'dg-menu__item',
        active ? 'is-active' : null,
        danger ? 'dg-menu__item--danger' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon ? (
        <span className="dg-menu__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-menu__label">{children}</span>
    </button>
  )
}

export interface MenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
}

/** Linka mezi skupinami položek. */
export function MenuSeparator({ className, ...rest }: MenuSeparatorProps) {
  return (
    <div className={['dg-menu__sep', className].filter(Boolean).join(' ')} role="separator" {...rest}>
      <span className="dg-menu__line" />
    </div>
  )
}

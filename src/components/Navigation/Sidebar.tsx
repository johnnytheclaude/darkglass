import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

export interface SidebarItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  icon?: ReactNode
  /** Číslo vpravo — kolik věcí v sekci čeká. */
  badge?: ReactNode
  /** Kde člověk právě je. */
  active?: boolean
  children?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

/** Položka bočního menu. Aktivní stav nese i aria-current, ne jen barvu. */
export function SidebarItem({
  icon,
  badge,
  active = false,
  children,
  className,
  type,
  ...rest
}: SidebarItemProps) {
  const classes = ['dg-sidebar__item', active ? 'is-active' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      type={type ?? 'button'}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {icon != null ? (
        <span className="dg-sidebar__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-sidebar__label">{children}</span>
      {badge != null ? <span className="dg-sidebar__badge">{badge}</span> : null}
    </button>
  )
}

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/** Nadpis skupiny položek („Hlavní", „Tým", „Systém"). */
export function SidebarGroup({ children, className, ...rest }: SidebarGroupProps) {
  const classes = ['dg-sidebar__group', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  ref?: Ref<HTMLElement>
}

/**
 * Boční menu — § Navigace · rozšíření. Svislá navigace aplikace: skupiny,
 * položky s ikonou a počtem, aktivní položka v akcentu.
 */
export function Sidebar({ children, className, ...rest }: SidebarProps) {
  const classes = ['dg-sidebar', className].filter(Boolean).join(' ')

  return (
    <nav className={classes} {...rest}>
      {children}
    </nav>
  )
}

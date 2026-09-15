import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'

/** Úroveň položky: hlavní sekce menu, nebo podpoložka pod ní. */
export type SidebarItemLevel = 'main' | 'sub'

export interface SidebarItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  icon?: ReactNode
  /** Číslo vpravo — kolik věcí v sekci čeká. */
  badge?: ReactNode
  /** Kde člověk právě je. */
  active?: boolean
  /** Druhá úroveň se kreslí níž a menším písmem. */
  level?: SidebarItemLevel
  /**
   * S adresou je položka odkaz (`<a>`), ne tlačítko — navigace patří do
   * historie prohlížeče a má jít otevřít v novém panelu. Aplikace, které mají
   * vlastní router (Next `Link`), předají jeho `onClick`/`href` sem.
   */
  href?: string
  children?: ReactNode
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>
}

/** Položka bočního menu. Aktivní stav nese i aria-current, ne jen barvu. */
export function SidebarItem({
  icon,
  badge,
  active = false,
  level = 'main',
  href,
  children,
  className,
  type,
  ...rest
}: SidebarItemProps) {
  const classes = [
    'dg-sidebar__item',
    level === 'sub' ? 'dg-sidebar__item--sub' : null,
    active ? 'is-active' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {icon != null ? (
        <span className="dg-sidebar__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-sidebar__label">{children}</span>
      {badge != null ? <span className="dg-sidebar__badge">{badge}</span> : null}
    </>
  )

  if (href != null) {
    const anchorProps = rest as unknown as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        className={classes}
        href={href}
        aria-current={active ? 'page' : undefined}
        {...anchorProps}
      >
        {inner}
      </a>
    )
  }

  const buttonProps = rest as unknown as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button
      className={classes}
      type={type ?? 'button'}
      aria-current={active ? 'page' : undefined}
      {...buttonProps}
    >
      {inner}
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

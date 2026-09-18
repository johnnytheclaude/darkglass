import { useEffect, useRef, useState } from 'react'
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

export interface SidebarBrandProps extends HTMLAttributes<HTMLDivElement> {
  /** Znak firmy — ikona nebo nahrané logo. */
  icon?: ReactNode
  /** Název firmy. */
  name: ReactNode
  /** Která aplikace to je („Admin", „Pokladna"). */
  app?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/** Karta firmy nad položkami — znak, název firmy a jméno aplikace. */
export function SidebarBrand({ icon, name, app, className, ...rest }: SidebarBrandProps) {
  const classes = ['dg-sidebar__brand', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {icon != null ? (
        <span className="dg-sidebar__brand-mark" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-sidebar__brand-texts">
        <span className="dg-sidebar__brand-name">{name}</span>
        {app != null ? <span className="dg-sidebar__brand-app">{app}</span> : null}
      </span>
    </div>
  )
}

export interface SidebarNoteProps extends HTMLAttributes<HTMLDivElement> {
  /** Co to je („Ostrý provoz", „Sandbox") — čte se jako první. */
  label?: ReactNode
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/** Pata panelu — v jakém režimu aplikace běží. */
export function SidebarNote({ label, children, className, ...rest }: SidebarNoteProps) {
  const classes = ['dg-sidebar__note', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {label != null ? <span className="dg-sidebar__note-label">{label}</span> : null}
      {children != null ? <span className="dg-sidebar__note-text">{children}</span> : null}
    </div>
  )
}

export interface SidebarScrollProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Rolovací část panelu — položky. Karta firmy nad ní a pata pod ní zůstanou
 * na svém místě i v nízkém okně; bez toho se pata odroluje mimo dohled a
 * vypadá to, že tam žádná není.
 */
export function SidebarScroll({ children, className, ...rest }: SidebarScrollProps) {
  const classes = ['dg-sidebar__scroll', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export interface SidebarSpacerProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
}

/** Výplň, která odsune patu panelu na spodní hranu. */
export function SidebarSpacer({ className, ...rest }: SidebarSpacerProps) {
  const classes = ['dg-sidebar__spacer', className].filter(Boolean).join(' ')

  return <div className={classes} aria-hidden="true" {...rest} />
}

export interface SidebarSectionProps {
  icon?: ReactNode
  /** Popisek hlavní položky sekce. */
  label: ReactNode
  /** Kam vede hlavní položka — typicky první obrazovka sekce. */
  href?: string
  /** Sekce, ve které člověk právě je: hlavní položka svítí akcentem. */
  active?: boolean
  /**
   * Podpoložky se ukazují jen u rozbalené sekce (akordeon podle návrhu).
   * Bez `expanded` je sekce sbalená a v panelu je vidět jen hlavní položka.
   */
  expanded?: boolean
  /** Props hlavní položky navíc — `onClick` aplikace s vlastním routerem. */
  itemProps?: Omit<SidebarItemProps, 'icon' | 'href' | 'active' | 'level' | 'children'>
  /** Podpoložky — `SidebarItem` s `level="sub"`. */
  children?: ReactNode
}

/**
 * Sekce bočního menu — hlavní položka s ikonou a pod ní podpoložky, které se
 * kreslí jen u rozbalené sekce. Sekce bez `children` je obyčejná položka.
 */
export function SidebarSection({
  icon,
  label,
  href,
  active = false,
  expanded = false,
  itemProps,
  children,
}: SidebarSectionProps) {
  const hasChildren = Array.isArray(children)
    ? children.length > 0
    : children != null && children !== false
  const open = hasChildren && expanded
  const subitemsRef = useRef<HTMLDivElement>(null)
  const [hasMoreBelow, setHasMoreBelow] = useState(false)

  useEffect(() => {
    const el = subitemsRef.current
    if (!open || !el) {
      setHasMoreBelow(false)
      return
    }

    const update = () => {
      setHasMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 1)
    }

    update()
    el.addEventListener('scroll', update)
    const observer = new ResizeObserver(update)
    observer.observe(el)

    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [open, children])

  const subitemsClasses = ['dg-sidebar__subitems', hasMoreBelow ? 'dg-sidebar__subitems--overflow' : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="dg-sidebar__section">
      <SidebarItem
        icon={icon}
        href={href}
        active={active}
        aria-expanded={hasChildren ? open : undefined}
        {...itemProps}
      >
        {label}
      </SidebarItem>
      {open ? (
        <div ref={subitemsRef} className={subitemsClasses}>
          {children}
        </div>
      ) : null}
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

import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface TopBarTab {
  /** Stabilní klíč záložky (`prehled`, `doklady`, …). */
  key: string
  label: ReactNode
}

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  /** Název firmy — první řádek značky vlevo. */
  company: ReactNode
  /** Prodejna pod názvem firmy („Pobočka Praha“). */
  store?: ReactNode
  /** Obsah čtvercové značky (logo, iniciála). */
  mark?: ReactNode
  /** Hlavní navigace aplikace. Prázdná = lišta jen se značkou a účtem. */
  tabs?: TopBarTab[]
  activeTab?: string
  onTabSelect?: (key: string) => void
  /** Datum vpravo („pondělí 14. září“) a pod ním otevírací doba. */
  day?: ReactNode
  meta?: ReactNode
  /** Přihlášený člověk — iniciály v kolečku a jméno. */
  user?: { initials: ReactNode; name: ReactNode }
  /** Vlastní prvky mezi datem a účtem (ikony, tlačítka). */
  actions?: ReactNode
  ref?: Ref<HTMLElement>
}

/**
 * Nav / Horní lišta — § Navigace. Říká, kam jdu: značka, hlavní navigace,
 * datum a účet. Nikdy nenese nástroje obrazovky, ty patří do bočního panelu.
 */
export function TopBar({
  company,
  store,
  mark,
  tabs = [],
  activeTab,
  onTabSelect,
  day,
  meta,
  user,
  actions,
  className,
  ...rest
}: TopBarProps) {
  return (
    <header className={['dg-topbar', className].filter(Boolean).join(' ')} {...rest}>
      <div className="dg-topbar__brand">
        <span className="dg-topbar__mark" aria-hidden={mark == null}>
          {mark}
        </span>
        <span className="dg-topbar__brand-text">
          <span className="dg-topbar__company">{company}</span>
          {store != null ? <span className="dg-topbar__store">{store}</span> : null}
        </span>
      </div>

      {tabs.length > 0 ? (
        <>
          <span className="dg-topbar__divider" aria-hidden="true" />
          <nav className="dg-topbar__tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={[
                  'dg-topbar__tab',
                  tab.key === activeTab ? 'is-active' : null,
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={tab.key === activeTab ? 'page' : undefined}
                onClick={() => onTabSelect?.(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </>
      ) : null}

      <span className="dg-topbar__spacer" />

      <div className="dg-topbar__utils">
        {day != null || meta != null ? (
          <span className="dg-topbar__date">
            {day != null ? <span className="dg-topbar__day">{day}</span> : null}
            {meta != null ? <span className="dg-topbar__meta">{meta}</span> : null}
          </span>
        ) : null}
        {actions}
        {user ? (
          <>
            <span className="dg-topbar__divider" aria-hidden="true" />
            <span className="dg-topbar__account">
              <span className="dg-topbar__avatar" aria-hidden="true">
                {user.initials}
              </span>
              <span className="dg-topbar__name">{user.name}</span>
            </span>
          </>
        ) : null}
      </div>
    </header>
  )
}

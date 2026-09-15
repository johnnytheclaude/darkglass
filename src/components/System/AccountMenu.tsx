import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface AccountMenuItem {
  key: string
  label: ReactNode
  /** Ikona před popiskem. */
  icon?: ReactNode
  /** Nebezpečná akce (Odhlásit se) — červený popisek. */
  danger?: boolean
  /** Linka nad položkou; návrh ji má před odhlášením. */
  separated?: boolean
  onClick?: () => void
}

export interface AccountMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Jméno přihlášeného člověka. */
  name: ReactNode
  /** E-mail pod jménem. */
  email?: ReactNode
  /** Iniciály do kolečka; bez nich se hlavička vykreslí bez avatara. */
  initials?: string
  items: AccountMenuItem[]
  ref?: Ref<HTMLDivElement>
}

/**
 * Menu / User — nabídka účtu pod avatarem v horní liště. Hlavička říká, kdo je
 * přihlášený (to je půlka jejího smyslu), položky jsou tlačítka, ne odkazy.
 */
export function AccountMenu({
  name,
  email,
  initials,
  items,
  className,
  ...rest
}: AccountMenuProps) {
  return (
    <div className={['dg-account-menu', className].filter(Boolean).join(' ')} role="menu" {...rest}>
      <div className="dg-account-menu__head">
        {initials ? <span className="dg-account-menu__avatar">{initials}</span> : null}
        <span className="dg-account-menu__who">
          <span className="dg-account-menu__name">{name}</span>
          {email != null ? <span className="dg-account-menu__mail">{email}</span> : null}
        </span>
      </div>
      {items.map((item) => (
        <span className="dg-account-menu__slot" key={item.key}>
          {item.separated ? <span className="dg-account-menu__sep" aria-hidden="true" /> : null}
          <button
            type="button"
            role="menuitem"
            className={['dg-account-menu__item', item.danger ? 'is-danger' : null]
              .filter(Boolean)
              .join(' ')}
            onClick={item.onClick}
          >
            {item.icon != null ? (
              <span className="dg-account-menu__icon">{item.icon}</span>
            ) : null}
            <span className="dg-account-menu__label">{item.label}</span>
          </button>
        </span>
      ))}
    </div>
  )
}

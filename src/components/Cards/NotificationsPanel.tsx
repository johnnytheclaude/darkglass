import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type NotificationTone = 'danger' | 'warning' | 'accent' | 'success' | 'neutral'

export interface NotificationItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Ikona v kolečku — co se stalo. */
  icon?: ReactNode
  tone?: NotificationTone
  title?: ReactNode
  /** Druhý řádek: číslo dokladu, zařízení, důvod. */
  subtitle?: ReactNode
  /** Datum vpravo. */
  date?: ReactNode
  ref?: Ref<HTMLLIElement>
}

/** Jedna položka panelu. Text se zalomí, datum drží vpravo. */
export function NotificationItem({
  icon,
  tone = 'danger',
  title,
  subtitle,
  date,
  className,
  ...rest
}: NotificationItemProps) {
  const classes = ['dg-notification', className].filter(Boolean).join(' ')

  return (
    <li className={classes} {...rest}>
      <span className={`dg-notification__tile dg-notification__tile--${tone}`}>{icon}</span>
      <span className="dg-notification__text">
        {title != null ? <span className="dg-notification__title">{title}</span> : null}
        {subtitle != null ? <span className="dg-notification__sub">{subtitle}</span> : null}
      </span>
      {date != null ? <span className="dg-notification__date">{date}</span> : null}
    </li>
  )
}

export interface NotificationsPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  /** Odznak vedle nadpisu („4 věci"). */
  count?: ReactNode
  /** Ladění odznaku; návrh má červený. */
  countTone?: NotificationTone
  /** Položky — `NotificationItem`. */
  children?: ReactNode
  /** Text, když není co řešit. */
  emptyLabel?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Panel / Notifications — „Potřebuje pozornost". Seznam věcí, které čekají na
 * člověka; položky odděluje linka odsazená pod ikonou.
 */
export function NotificationsPanel({
  title,
  count,
  countTone = 'danger',
  children,
  emptyLabel,
  className,
  ...rest
}: NotificationsPanelProps) {
  const classes = ['dg-notifications', className].filter(Boolean).join(' ')
  const empty = children == null || (Array.isArray(children) && children.length === 0)

  return (
    <div className={classes} {...rest}>
      <div className="dg-notifications__head">
        {title != null ? <span className="dg-notifications__title">{title}</span> : null}
        {count != null ? (
          <span className={`dg-notifications__count dg-notifications__count--${countTone}`}>
            {count}
          </span>
        ) : null}
      </div>
      {empty && emptyLabel != null ? (
        <span className="dg-notifications__empty">{emptyLabel}</span>
      ) : (
        <ul className="dg-notifications__list">{children}</ul>
      )}
    </div>
  )
}

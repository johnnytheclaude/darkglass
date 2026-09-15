import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react'
import { IconCheck } from '../Icons/IconCheck'
import { IconChevronRight } from '../Icons/IconChevronRight'

export type ListRowTone = 'danger' | 'warning' | 'info' | 'success' | 'purple' | 'neutral'

export interface ListRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Ikona v barevné dlaždici vlevo. */
  icon?: ReactNode
  /** Barva dlaždice; `neutral` je tichá výplň s tmavou ikonou. */
  tone?: ListRowTone
  /** Miniatura zboží místo dlaždice (44 px); `true` kreslí prázdné místo. */
  thumb?: ReactNode | boolean
  /** Avatar osoby místo dlaždice. */
  avatar?: ReactNode
  /** Zaškrtávátko vlevo (hromadný výběr). */
  selectable?: boolean
  selected?: boolean
  onSelectedChange?: (selected: boolean) => void
  selectLabel?: string
  title: ReactNode
  sub?: ReactNode
  /** Datum vpravo od textu. */
  date?: ReactNode
  /** Částka vpravo; drží se na jednom řádku. */
  amount?: ReactNode
  /** Odznak stavu vpravo. */
  badge?: ReactNode
  /** Akce vpravo (tlačítko, vypínač). */
  action?: ReactNode
  /** Šipka na konci; výchozí je zapnutá u řádků s `onClick`. */
  chevron?: boolean
  /** Řádek uvnitř seskupeného seznamu — bez vlastní výplně a rádiusu. */
  inset?: boolean
  /** Nedostupná akce — řádek zůstane čitelný, ale nereaguje a neostří se. */
  disabled?: boolean
  ref?: Ref<HTMLDivElement>
}

/**
 * ListRow — nejpoužívanější prvek aplikace. Vysoký 74 px, aby se dal
 * trefit prstem; text se vždy ořízne, řádek nikdy nepřeteče.
 */
export function ListRow({
  icon,
  tone = 'neutral',
  thumb,
  avatar,
  selectable = false,
  selected = false,
  onSelectedChange,
  selectLabel = 'Vybrat řádek',
  title,
  sub,
  date,
  amount,
  badge,
  action,
  chevron,
  inset = false,
  disabled = false,
  className,
  onClick,
  onKeyDown,
  ...rest
}: ListRowProps) {
  const interactive = onClick != null && !disabled
  const showChevron = chevron ?? onClick != null
  const classes = [
    'dg-list-row',
    inset ? 'dg-list-row--inset' : null,
    interactive ? 'dg-list-row--interactive' : null,
    disabled ? 'is-disabled' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  /* Řádek je div, ale klikatelný řádek je akce: musí jít i z klávesnice. */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (!interactive || event.defaultPrevented) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.(event as unknown as MouseEvent<HTMLDivElement>)
    }
  }

  return (
    <div
      className={classes}
      onClick={interactive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled ? true : undefined}
      {...rest}
    >
      {selectable ? (
        <button
          type="button"
          className={selected ? 'dg-list-row__check is-selected' : 'dg-list-row__check'}
          aria-pressed={selected}
          aria-label={selectLabel}
          onClick={(e) => {
            e.stopPropagation()
            onSelectedChange?.(!selected)
          }}
        >
          {selected ? <IconCheck size={14} /> : null}
        </button>
      ) : null}
      {icon != null ? (
        <span className={`dg-list-row__tile dg-list-row__tile--${tone}`}>{icon}</span>
      ) : null}
      {thumb ? (
        <span className="dg-list-row__thumb">{thumb === true ? null : thumb}</span>
      ) : null}
      {avatar != null ? <span className="dg-list-row__avatar">{avatar}</span> : null}
      <div className="dg-list-row__text">
        <span className="dg-list-row__title">{title}</span>
        {sub != null ? <span className="dg-list-row__sub">{sub}</span> : null}
      </div>
      {date != null ? <span className="dg-list-row__date">{date}</span> : null}
      {amount != null ? <span className="dg-list-row__amount">{amount}</span> : null}
      {badge != null ? <span className="dg-list-row__badge">{badge}</span> : null}
      {action != null ? <span className="dg-list-row__action">{action}</span> : null}
      {showChevron ? (
        <IconChevronRight size={18} className="dg-list-row__chevron" />
      ) : null}
    </div>
  )
}

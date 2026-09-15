import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconSearch } from '../Icons/IconSearch'

export interface CommandItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Klávesa, kterou akce jde spustit rovnou. */
  shortcut?: ReactNode
  icon?: ReactNode
  /** Řádek, na kterém stojí výběr. */
  active?: boolean
  children?: ReactNode
  onSelect?: () => void
  ref?: Ref<HTMLDivElement>
}

/** Jedna nabídnutá akce. Výběr řídí aplikace (šipky), proto `active` z props. */
export function CommandItem({
  shortcut,
  icon,
  active = false,
  children,
  className,
  onSelect,
  onClick,
  ...rest
}: CommandItemProps) {
  const classes = ['dg-command__item', active ? 'is-active' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      role="option"
      aria-selected={active}
      onClick={(event) => {
        onClick?.(event)
        onSelect?.()
      }}
      {...rest}
    >
      {icon != null ? (
        <span className="dg-command__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="dg-command__label">{children}</span>
      {shortcut != null ? <span className="dg-command__key">{shortcut}</span> : null}
    </div>
  )
}

export interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/** Nadpis skupiny akcí („AKCE", „POSLEDNÍ"). */
export function CommandGroup({ children, className, ...rest }: CommandGroupProps) {
  const classes = ['dg-command__group', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export interface CommandPaletteProps extends HTMLAttributes<HTMLDivElement> {
  /** Co je napsané v poli (řízené pole). */
  value?: string
  onValueChange?: (next: string) => void
  placeholder?: string
  /** Popisek klávesy vpravo v poli; `null` ho schová. */
  escLabel?: ReactNode
  inputRef?: Ref<HTMLInputElement>
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Vyhledávací paleta — § Navigace · rozšíření. Pole nahoře, pod ním nabídnuté
 * akce ve skupinách. Otevírání a klávesy řeší aplikace; knihovna kreslí paletu.
 */
export function CommandPalette({
  value,
  onValueChange,
  placeholder = 'Co chcete udělat?',
  escLabel = 'ESC',
  inputRef,
  children,
  className,
  ...rest
}: CommandPaletteProps) {
  const classes = ['dg-command', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="dialog" aria-label={placeholder} {...rest}>
      <div className="dg-command__input">
        <span className="dg-command__search" aria-hidden="true">
          <IconSearch />
        </span>
        <input
          className="dg-command__field"
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(event) => onValueChange?.(event.target.value)}
        />
        {escLabel != null ? <span className="dg-command__esc">{escLabel}</span> : null}
      </div>
      <div className="dg-command__list" role="listbox" aria-label={placeholder}>
        {children}
      </div>
    </div>
  )
}

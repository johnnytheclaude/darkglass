import { useId } from 'react'
import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconX } from '../Icons/IconX'

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nadřazený popisek nad nadpisem („POLOŽKA“) — kreslí se verzálkami. */
  eyebrow?: ReactNode
  title: ReactNode
  onClose?: () => void
  closeLabel?: string
  /** Řádky detailu — typicky `DrawerRow`. */
  children?: ReactNode
  /** Tlačítka dole (Vytisknout / Doplnit). */
  footer?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Boční panel s detailem. Hlavička i patička stojí, prostředek se roluje —
 * tlačítka zůstanou vidět i u dlouhého detailu.
 */
export function Drawer({
  eyebrow,
  title,
  onClose,
  closeLabel = 'Zavřít panel',
  children,
  footer,
  className,
  ...rest
}: DrawerProps) {
  const titleId = useId()

  return (
    <aside
      className={['dg-drawer', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
      {...rest}
    >
      <div className="dg-drawer__head">
        <div className="dg-drawer__titles">
          {eyebrow != null ? <span className="dg-drawer__eyebrow">{eyebrow}</span> : null}
          <span className="dg-drawer__title" id={titleId}>
            {title}
          </span>
        </div>
        {onClose ? (
          <button type="button" className="dg-drawer__close" onClick={onClose} aria-label={closeLabel}>
            <IconX size={16} />
          </button>
        ) : null}
      </div>
      <div className="dg-drawer__body">{children}</div>
      {footer != null ? <div className="dg-drawer__footer">{footer}</div> : null}
    </aside>
  )
}

export interface DrawerRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Název údaje vlevo. */
  label: ReactNode
  /** Hodnota vpravo; formátuje ji aplikace. */
  value: ReactNode
  ref?: Ref<HTMLDivElement>
}

/** Řádek detailu „název — hodnota“ oddělený linkou. */
export function DrawerRow({ label, value, className, ...rest }: DrawerRowProps) {
  return (
    <div className={['dg-drawer__row', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-drawer__key">{label}</span>
      <span className="dg-drawer__value">{value}</span>
    </div>
  )
}

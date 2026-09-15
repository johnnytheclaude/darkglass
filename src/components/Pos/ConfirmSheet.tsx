import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ConfirmSheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Otázka („Obnovit účet z 14:12?“). */
  title: ReactNode
  /** Co je potřeba k rozhodnutí vědět. */
  description?: ReactNode
  /** Tlačítka voleb — vykreslí se v řádku pod textem. */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Sheet / Dolní — spodní panel s otázkou a volbami.
 * Sedí u spodní hrany obrazovky, kam obsluha dosáhne palcem; panel je plný,
 * ne průsvitný, aby text nerušil obsah pod ním.
 */
export function ConfirmSheet({
  title,
  description,
  children,
  className,
  role,
  ...rest
}: ConfirmSheetProps) {
  return (
    <div
      className={['dg-confirm-sheet', className].filter(Boolean).join(' ')}
      role={role ?? 'group'}
      {...rest}
    >
      <span className="dg-confirm-sheet__title">{title}</span>
      {description != null ? (
        <span className="dg-confirm-sheet__desc">{description}</span>
      ) : null}
      {children != null ? <div className="dg-confirm-sheet__actions">{children}</div> : null}
    </div>
  )
}

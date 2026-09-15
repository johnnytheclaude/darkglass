import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface SandboxBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Co se obsluze říká („Zkušební režim — doklady nejsou ostré“). */
  text: ReactNode
  /** Nepovinná akce vpravo (přepnout do ostrého provozu, ukázat vysvětlení). */
  actionLabel?: ReactNode
  onAction?: () => void
  ref?: Ref<HTMLDivElement>
}

/**
 * Pruh zkušebního režimu. Stejný prvek, jaký nese stavová lišta Pokladny —
 * samostatně ho potřebuje každá aplikace, která stavovou lištu nemá (telefon,
 * Admin). Fialová z tokenů: akcent firmy zůstává vyhrazený ostrému provozu.
 */
export function SandboxBar({ text, actionLabel, onAction, className, ...rest }: SandboxBarProps) {
  return (
    <div
      className={['dg-sandbox-strip', className].filter(Boolean).join(' ')}
      role="status"
      {...rest}
    >
      <span className="dg-sandbox-strip__text">{text}</span>
      {actionLabel != null ? (
        <button type="button" className="dg-sandbox-strip__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

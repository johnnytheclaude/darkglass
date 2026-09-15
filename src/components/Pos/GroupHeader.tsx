import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface GroupHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Název skupiny („NEPÍPNUTÉ“) — vykreslí se verzálkami. */
  label: ReactNode
  /** Počet položek ve skupině; zobrazí se v závorce. */
  count?: number
  ref?: Ref<HTMLDivElement>
}

/**
 * Table / Group Header — mezitulek uvnitř dlouhého seznamu nebo tabulky.
 * Nemá rádius: navazuje na řádky pod sebou a odděluje je bez další linky.
 */
export function GroupHeader({ label, count, className, ...rest }: GroupHeaderProps) {
  return (
    <div className={['dg-group-header', className].filter(Boolean).join(' ')} {...rest}>
      <span className="dg-group-header__label">{label}</span>
      {count != null ? <span className="dg-group-header__count">({count})</span> : null}
    </div>
  )
}

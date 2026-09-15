import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface GroupCaptionProps extends HTMLAttributes<HTMLDivElement> {
  /** Název skupiny („Prodej“, „Zboží a sklad“). */
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Skupina — tichý popisek nad blokem řádků (menu Pokladny, dlouhé seznamy).
 * Na rozdíl od `GroupHeader` nestojí uvnitř tabulky: nemá výplň ani verzálky,
 * jen pojmenuje, co pod ním následuje, a nechá řádkům celý prostor.
 */
export function GroupCaption({ children, className, ...rest }: GroupCaptionProps) {
  return (
    <div className={['dg-group-caption', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

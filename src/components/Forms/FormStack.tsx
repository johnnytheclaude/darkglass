import type { ComponentProps, HTMLAttributes, ReactNode, Ref } from 'react'

/** Mezera mezi poli: `pole` 14 (návrh), `tesne` 12 pro hustý dialog. */
export type FormStackGap = 'pole' | 'tesne'
export type FormStackElement = 'div' | 'form' | 'fieldset' | 'section'

export interface FormStackProps extends HTMLAttributes<HTMLElement> {
  /** Jednotná svislá mezera mezi VŠEMI poli. Výchozí `pole` = 14 px návrhu. */
  gap?: FormStackGap
  /** Prvek, kterým se stack vykreslí — kvůli sémantice (`form`, `fieldset`). */
  as?: FormStackElement
  children?: ReactNode
  ref?: Ref<HTMLElement>
}

/**
 * FormStack — svislý sloupec polí formuláře s jednotnou mezerou.
 *
 * Protějšek `Stack` (ten skládá bloky panelu). Pole se skládají tímhle, ne
 * marginy u jednotlivých polí: mezera pak patří formuláři, nezdvojí se, když
 * dvě pole stojí vedle sebe, a nezmizí, když se pole podmíněně vynechá.
 *
 * Uvnitř `Card` a `FormDialog` ho psát nemusíš — tělo karty i sloupec polí
 * dialogu už jsou stack se stejnou mezerou.
 */
export function FormStack({
  gap = 'pole',
  as: Element = 'div',
  className,
  children,
  ...rest
}: FormStackProps) {
  const classes = ['dg-formstack', gap === 'tesne' ? 'dg-formstack--tesne' : null, className]
    .filter(Boolean)
    .join(' ')

  // Prvek je proměnný (div / form / …), typy JSX ale chtějí konkrétní tag;
  // všechny povolené prvky mají stejné atributy, tak se sjednotí na `div`.
  const Tag = Element as 'div'

  return (
    <Tag className={classes} {...(rest as ComponentProps<'div'>)}>
      {children}
    </Tag>
  )
}

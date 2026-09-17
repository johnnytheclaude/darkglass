import type { ComponentProps, HTMLAttributes, ReactNode, Ref } from 'react'

/** Mezera mezi bloky: xs 8, s 12, m 14, l 16, xl 20 (px návrhu, škáluje se). */
export type StackGap = 'xs' | 's' | 'm' | 'l' | 'xl'
export type StackAlign = 'stretch' | 'start' | 'center' | 'end'
export type StackElement = 'div' | 'aside' | 'section' | 'nav' | 'header' | 'footer'

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Směr skládání; výchozí je svislý sloupec. */
  direction?: 'column' | 'row'
  /** Jednotná mezera mezi VŠEMI bloky. Výchozí `m` = mezera karty (14). */
  gap?: StackGap
  align?: StackAlign
  /** Prvek, kterým se stack vykreslí — kvůli sémantice (`aside`, `section`). */
  as?: StackElement
  children?: ReactNode
  ref?: Ref<HTMLElement>
}

/**
 * Stack — svislý (nebo vodorovný) sloupec s jednotnou mezerou mezi bloky.
 * Obsah se skládá tímhle, ne marginy u jednotlivých prvků: mezera pak patří
 * panelu, ne tomu, co v něm zrovna stojí, a nezmizí, když se blok vynechá.
 */
export function Stack({
  direction = 'column',
  gap = 'm',
  align = 'stretch',
  as: Element = 'div',
  className,
  children,
  ...rest
}: StackProps) {
  const classes = [
    'dg-stack',
    `dg-stack--gap-${gap}`,
    direction === 'row' ? 'dg-stack--row' : null,
    align !== 'stretch' ? `dg-stack--${align}` : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Prvek je proměnný (div / aside / …), typy JSX ale chtějí konkrétní tag;
  // všechny povolené prvky mají stejné atributy, tak se sjednotí na `div`.
  const Tag = Element as 'div'

  return (
    <Tag className={classes} {...(rest as ComponentProps<'div'>)}>
      {children}
    </Tag>
  )
}

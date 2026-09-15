import type { HTMLAttributes, ReactNode, Ref } from 'react'
import { IconChevronRight } from '../Icons/IconChevronRight'

/* `onToggle` je i jméno HTML události (<details>), proto se z atributů vyřadí —
   jinak tsc hlásí TS2430. */
export interface AccordionSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onToggle'> {
  title?: ReactNode
  /** Rozbaleno? Stav drží aplikace — knihovna si ho nepamatuje. */
  open?: boolean
  onToggle?: (next: boolean) => void
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/** Jedna sekce. Obsah se nevykresluje, dokud není rozbalená. */
export function AccordionSection({
  title,
  open = false,
  onToggle,
  children,
  className,
  ...rest
}: AccordionSectionProps) {
  const classes = ['dg-accordion__section', open ? 'is-open' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      <button
        className="dg-accordion__head"
        type="button"
        aria-expanded={open}
        onClick={() => onToggle?.(!open)}
      >
        <span className="dg-accordion__title">{title}</span>
        <span className="dg-accordion__chevron" aria-hidden="true">
          <IconChevronRight />
        </span>
      </button>
      {open ? <div className="dg-accordion__body">{children}</div> : null}
    </div>
  )
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Rozbalovací sekce — § Navigace · rozšíření. Drží obsah schovaný, dokud ho
 * člověk nepotřebuje; sekce se dělí linkou přes celou šířku.
 */
export function Accordion({ children, className, ...rest }: AccordionProps) {
  const classes = ['dg-accordion', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

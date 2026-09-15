import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'
import { IconChevronRight } from '../Icons/IconChevronRight'

/* `onToggle` koliduje s HTML událostí téhož jména — viz AccordionSection. */
export interface TreeItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'onToggle'> {
  /** Zanoření: 0 je kořen, každá úroveň odsadí o 18 px. */
  level?: number
  selected?: boolean
  /** Má uzel potomky? Bez toho se šipka nekreslí. */
  expandable?: boolean
  expanded?: boolean
  onToggle?: (next: boolean) => void
  children?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

/** Uzel stromu. Rozbalení řídí aplikace — knihovna si stav nedrží. */
export function TreeItem({
  level = 0,
  selected = false,
  expandable = false,
  expanded = false,
  onToggle,
  children,
  className,
  style,
  type,
  onClick,
  ...rest
}: TreeItemProps) {
  const classes = ['dg-tree__item', selected ? 'is-selected' : null, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      type={type ?? 'button'}
      aria-level={level + 1}
      aria-selected={selected}
      aria-expanded={expandable ? expanded : undefined}
      role="treeitem"
      style={{ paddingLeft: `calc(${10 + level * 18}px * var(--scale))`, ...style }}
      onClick={(event) => {
        onClick?.(event)
        if (expandable) onToggle?.(!expanded)
      }}
      {...rest}
    >
      {expandable ? (
        <span
          className={expanded ? 'dg-tree__chevron is-open' : 'dg-tree__chevron'}
          aria-hidden="true"
        >
          <IconChevronRight />
        </span>
      ) : null}
      <span className="dg-tree__label">{children}</span>
    </button>
  )
}

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
  /** Popis stromu pro čtečku. */
  label?: string
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Stromová struktura — § Navigace · rozšíření. Zanořený seznam kategorií
 * a položek; vybraný uzel svítí akcentem.
 */
export function TreeView({ label, children, className, ...rest }: TreeViewProps) {
  const classes = ['dg-tree', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="tree" aria-label={label} {...rest}>
      {children}
    </div>
  )
}

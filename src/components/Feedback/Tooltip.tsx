import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type TooltipVariant = 'value' | 'label'

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  /** `value` = tučná částka nad grafem, `label` = tichý popisek prvku. */
  variant?: TooltipVariant
  children?: ReactNode
  ref?: Ref<HTMLSpanElement>
}

/**
 * Tooltip — bublina s hodnotou nebo popiskem. Knihovna kreslí jen bublinu;
 * kdy a kde se ukáže, řídí aplikace.
 */
export function Tooltip({ variant = 'value', children, className, role, ...rest }: TooltipProps) {
  const classes = ['dg-tooltip', `dg-tooltip--${variant}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} role={role ?? 'tooltip'} {...rest}>
      {children}
    </span>
  )
}

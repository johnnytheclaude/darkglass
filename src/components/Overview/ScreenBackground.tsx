import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface ScreenBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  /** Bez zaoblení — na celou obrazovku aplikace. S ním jako ukázka v kartě. */
  rounded?: boolean
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

/**
 * Pozadí / Gradient — pozadí obrazovky. Dva jemné odstíny nad podkladem
 * motivu; nic jiného na obrazovce nesmí mít vlastní pozadí.
 */
export function ScreenBackground({
  rounded = false,
  children,
  className,
  ...rest
}: ScreenBackgroundProps) {
  const classes = ['dg-screen-bg', rounded && 'dg-screen-bg--rounded', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

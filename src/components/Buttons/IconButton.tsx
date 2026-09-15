import type { ReactNode } from 'react'
import { Button } from './Button'
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button'

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'iconStart' | 'iconEnd' | 'block'> {
  /** Ikona — komponenta z components/Icons. */
  icon: ReactNode
  /** Povinný textový popis: vykreslí se jako aria-label (čtečka, klávesnice). */
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Čtvercové tlačítko jen s ikonou (Btn / Icon z návrhu) — 34 / 42 / 52 px. */
export function IconButton({
  icon,
  label,
  variant = 'secondary',
  size = 'm',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <Button
      {...rest}
      variant={variant}
      size={size}
      aria-label={label}
      title={label}
      className={['dg-icon-button', className].filter(Boolean).join(' ')}
      iconStart={icon}
    />
  )
}

import type { IconProps } from './IconProps'

export interface IconStarProps extends IconProps {
  /** Vyplněná hvězda = započítaný stupeň hodnocení. */
  filled?: boolean
}

export function IconStar({ size = 24, filled = false, ...rest }: IconStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="m12 3.5 2.65 5.37 5.93.86-4.29 4.18 1.01 5.9L12 17.03l-5.3 2.78 1.01-5.9-4.29-4.18 5.93-.86L12 3.5Z" />
    </svg>
  )
}

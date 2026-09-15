import type { IconProps } from './IconProps'

export function IconPlus({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M10 4.5v11M4.5 10h11" />
    </svg>
  )
}

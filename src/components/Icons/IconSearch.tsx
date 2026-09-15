import type { IconProps } from './IconProps'

export function IconSearch({ size = 18, ...rest }: IconProps) {
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
      <circle cx="9" cy="9" r="5.2" />
      <path d="m13 13 3.2 3.2" />
    </svg>
  )
}

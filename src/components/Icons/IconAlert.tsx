import type { IconProps } from './IconProps'

export function IconAlert({ size = 18, ...rest }: IconProps) {
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
      <path d="M10 2.8 1.9 16.6h16.2L10 2.8Z" />
      <path d="M10 7.6v4.1" />
      <path d="M10 14.1h.01" />
    </svg>
  )
}

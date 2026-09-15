import type { IconProps } from './IconProps'

export function IconInfo({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 9v5" />
      <path d="M10 6.2h.01" />
    </svg>
  )
}

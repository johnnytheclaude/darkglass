import type { IconProps } from './IconProps'

export function IconClock({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 5.75V10l3 1.75" />
    </svg>
  )
}

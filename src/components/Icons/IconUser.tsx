import type { IconProps } from './IconProps'

export function IconUser({ size = 18, ...rest }: IconProps) {
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
      <circle cx="10" cy="7" r="3.2" />
      <path d="M3.8 17c.7-3.1 3.2-4.6 6.2-4.6s5.5 1.5 6.2 4.6" />
    </svg>
  )
}

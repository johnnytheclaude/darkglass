import type { IconProps } from './IconProps'

export function IconUsers({ size = 18, ...rest }: IconProps) {
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
      <circle cx="7.6" cy="6.6" r="2.8" />
      <path d="M2.6 16.6c0-2.6 2.2-4.4 5-4.4s5 1.8 5 4.4" />
      <path d="M13.4 4.2a2.8 2.8 0 0 1 0 5.2" />
      <path d="M14.6 12.5c1.7.5 2.8 1.9 2.8 4.1" />
    </svg>
  )
}

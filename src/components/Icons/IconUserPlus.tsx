import type { IconProps } from './IconProps'

export function IconUserPlus({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <circle cx="8.25" cy="6.5" r="3.25" />
      <path d="M2.5 16.75a5.75 5.75 0 0 1 10.15-3.7" />
      <path d="M15.25 12.5v5" />
      <path d="M12.75 15h5" />
    </svg>
  )
}

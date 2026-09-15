import type { IconProps } from './IconProps'

export function IconArrowUp({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M10 16V4.6" />
      <path d="m5 9.4 5-5 5 5" />
    </svg>
  )
}

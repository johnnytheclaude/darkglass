import type { IconProps } from './IconProps'

export function IconSort({ size = 12, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="m5.5 8 4.5-4.5L14.5 8" />
      <path d="m5.5 12 4.5 4.5 4.5-4.5" />
    </svg>
  )
}

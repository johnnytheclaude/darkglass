import type { IconProps } from './IconProps'

export function IconX({ size = 18, ...rest }: IconProps) {
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
      <path d="m5.5 5.5 9 9M14.5 5.5l-9 9" />
    </svg>
  )
}

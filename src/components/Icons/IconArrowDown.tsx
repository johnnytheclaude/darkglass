import type { IconProps } from './IconProps'

export function IconArrowDown({ size = 18, ...rest }: IconProps) {
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
      <path d="M10 4v11.4" />
      <path d="m5 10.6 5 5 5-5" />
    </svg>
  )
}

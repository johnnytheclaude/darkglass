import type { IconProps } from './IconProps'

export function IconPencil({ size = 18, ...rest }: IconProps) {
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
      <path d="M13.4 3.6a1.7 1.7 0 0 1 2.4 2.4L7.3 14.5 4 15.5l1-3.3 8.4-8.6Z" />
    </svg>
  )
}

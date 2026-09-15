import type { IconProps } from './IconProps'

export function IconLogout({ size = 18, ...rest }: IconProps) {
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
      <path d="M12.4 6V4.4a1.4 1.4 0 0 0-1.4-1.4H4.8a1.4 1.4 0 0 0-1.4 1.4v11.2A1.4 1.4 0 0 0 4.8 17H11a1.4 1.4 0 0 0 1.4-1.4V14" />
      <path d="M8.6 10h8.2" />
      <path d="m14.4 7.4 2.6 2.6-2.6 2.6" />
    </svg>
  )
}

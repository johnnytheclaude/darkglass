import type { IconProps } from './IconProps'

export function IconDashboard({ size = 18, ...rest }: IconProps) {
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
      <rect x="2.8" y="2.8" width="6" height="6.4" rx="1.4" />
      <rect x="11.2" y="2.8" width="6" height="4" rx="1.4" />
      <rect x="11.2" y="9.2" width="6" height="8" rx="1.4" />
      <rect x="2.8" y="11.6" width="6" height="5.6" rx="1.4" />
    </svg>
  )
}

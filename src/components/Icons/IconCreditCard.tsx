import type { IconProps } from './IconProps'

/** Lucide `credit-card` — platba kartou a stavy platebního terminálu. */
export function IconCreditCard({ size = 18, ...rest }: IconProps) {
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
      <rect x="1.8" y="4" width="16.4" height="12" rx="2.2" />
      <path d="M1.8 8.4h16.4" />
      <path d="M5 12.6h2.6" />
    </svg>
  )
}

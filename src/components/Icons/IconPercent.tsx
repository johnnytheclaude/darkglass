import type { IconProps } from './IconProps'

/** Lucide `percent` — cena, sleva, marže: prodej za nákupní cenu. */
export function IconPercent({ size = 18, ...rest }: IconProps) {
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
      <path d="M16 4 4 16" />
      <circle cx="6.4" cy="6.4" r="2.2" />
      <circle cx="13.6" cy="13.6" r="2.2" />
    </svg>
  )
}

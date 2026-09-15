import type { IconProps } from './IconProps'

/** Lucide `gift` — dárkový poukaz: prodej poukazu a dotaz na zůstatek. */
export function IconGift({ size = 18, ...rest }: IconProps) {
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
      <rect x="2.5" y="6.7" width="15" height="3.3" rx="0.9" />
      <path d="M10 6.7v10.8" />
      <path d="M15.8 10v5.8a1.7 1.7 0 0 1-1.7 1.7H5.9a1.7 1.7 0 0 1-1.7-1.7V10" />
      <path d="M6.3 6.7a2.1 2.1 0 0 1 0-4.2C8.4 2.5 10 4.4 10 6.7c0-2.3 1.6-4.2 3.7-4.2a2.1 2.1 0 0 1 0 4.2" />
    </svg>
  )
}

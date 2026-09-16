import type { IconProps } from './IconProps'

/** Lucide `banknote` — platba hotovostí (Nastavení · Platby a zaokrouhlení). */
export function IconBanknote({ size = 18, ...rest }: IconProps) {
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
      <rect x="1.7" y="5" width="16.6" height="10" rx="1.8" />
      <circle cx="10" cy="10" r="1.8" />
      <path d="M5 10h.01" />
      <path d="M15 10h.01" />
    </svg>
  )
}

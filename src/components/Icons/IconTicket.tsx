import type { IconProps } from './IconProps'

/** Lucide `ticket` — stravenky a poukázky (Nastavení · Platby a zaokrouhlení). */
export function IconTicket({ size = 18, ...rest }: IconProps) {
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
      <path d="M1.7 7.5a2.5 2.5 0 0 1 0 5v1.7a1.7 1.7 0 0 0 1.7 1.7h13.2a1.7 1.7 0 0 0 1.7-1.7v-1.7a2.5 2.5 0 0 1 0-5V5.8a1.7 1.7 0 0 0-1.7-1.7H3.4a1.7 1.7 0 0 0-1.7 1.7Z" />
      <path d="M10.8 4.1v1.7" />
      <path d="M10.8 9.1v1.7" />
      <path d="M10.8 14.2v1.7" />
    </svg>
  )
}

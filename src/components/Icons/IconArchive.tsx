import type { IconProps } from './IconProps'

/** Lucide `archive` — zásuvka pokladny: otevření mimo prodej, uložený doklad. */
export function IconArchive({ size = 18, ...rest }: IconProps) {
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
      <rect x="2.2" y="2.8" width="15.6" height="4" rx="1.2" />
      <path d="M3.6 6.8v8.6a1.8 1.8 0 0 0 1.8 1.8h9.2a1.8 1.8 0 0 0 1.8-1.8V6.8" />
      <path d="M8.2 10.2h3.6" />
    </svg>
  )
}

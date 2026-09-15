import type { IconProps } from './IconProps'

/** Lucide `refresh-cw` — zopakovat pokus (poslat kartu znovu, odeslat frontu). */
export function IconRefresh({ size = 18, ...rest }: IconProps) {
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
      <path d="M17 8.4A7.2 7.2 0 0 0 4.9 5.1L2.8 7.1" />
      <path d="M3 11.6a7.2 7.2 0 0 0 12.1 3.3l2.1-2" />
      <path d="M2.8 3.4v3.7h3.7" />
      <path d="M17.2 16.6v-3.7h-3.7" />
    </svg>
  )
}

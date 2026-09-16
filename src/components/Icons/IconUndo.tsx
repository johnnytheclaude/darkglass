import type { IconProps } from './IconProps'

/** Lucide `undo-2` — vrátit zpět (vratka z dokladu, zrušení kroku). */
export function IconUndo({ size = 18, ...rest }: IconProps) {
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
      <path d="M7.5 11.7 3.3 7.5l4.2-4.2" />
      <path d="M3.3 7.5h8.8a4.6 4.6 0 0 1 0 9.2H9.2" />
    </svg>
  )
}

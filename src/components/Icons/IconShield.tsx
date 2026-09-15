import type { IconProps } from './IconProps'

/** Lucide `shield` — schválení vedoucím: úkon, který potřebuje cizí PIN. */
export function IconShield({ size = 18, ...rest }: IconProps) {
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
      <path d="M10 2.4 3.6 5v4.6c0 3.7 2.6 6.4 6.4 8 3.8-1.6 6.4-4.3 6.4-8V5L10 2.4Z" />
    </svg>
  )
}

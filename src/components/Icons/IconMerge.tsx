import type { IconProps } from './IconProps'

/** Lucide `merge` — sloučení dvou větví do jedné (duplicity dodavatelů). */
export function IconMerge({ size = 18, ...rest }: IconProps) {
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
      <path d="m7.2 5.8 2.8-2.8 2.8 2.8" />
      <path d="M10 3v5.4c0 1.2.6 2.3 1.6 3l3.6 2.4" />
      <path d="M10 8.4c0 1.2-.6 2.3-1.6 3L4.8 13.8" />
      <path d="m13.6 14.4 3.6-1-1-3.6" />
    </svg>
  )
}

import type { IconProps } from './IconProps'

export function IconScanBarcode({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M2.75 6.75v-1.5a2.5 2.5 0 0 1 2.5-2.5h1.5" />
      <path d="M17.25 6.75v-1.5a2.5 2.5 0 0 0-2.5-2.5h-1.5" />
      <path d="M2.75 13.25v1.5a2.5 2.5 0 0 0 2.5 2.5h1.5" />
      <path d="M17.25 13.25v1.5a2.5 2.5 0 0 1-2.5 2.5h-1.5" />
      <path d="M6.25 6.75v6.5" />
      <path d="M10 6.75v6.5" />
      <path d="M13.75 6.75v6.5" />
    </svg>
  )
}

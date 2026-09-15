import type { IconProps } from './IconProps'

export function IconPrinter({ size = 18, ...rest }: IconProps) {
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
      <path d="M5.6 7.6V2.8h8.8v4.8" />
      <path d="M5.6 14.4H4.2a1.8 1.8 0 0 1-1.8-1.8V9.4a1.8 1.8 0 0 1 1.8-1.8h11.6a1.8 1.8 0 0 1 1.8 1.8v3.2a1.8 1.8 0 0 1-1.8 1.8h-1.4" />
      <path d="M5.6 11.6h8.8v5.6H5.6Z" />
      <path d="M14.8 10.2h.6" />
    </svg>
  )
}

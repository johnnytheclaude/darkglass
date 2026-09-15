import type { IconProps } from './IconProps'

export function IconChartColumn({ size = 18, ...rest }: IconProps) {
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
      <path d="M3.4 16.3h13.2" />
      <path d="M6.2 16.3V9.6M10 16.3V4.9M13.8 16.3v-4.4" />
    </svg>
  )
}

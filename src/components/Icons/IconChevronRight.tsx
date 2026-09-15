import type { IconProps } from './IconProps'

/** Šipka vpřed — Nav / chevron-right z § Kalendář a čas. */
export function IconChevronRight({ size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  )
}

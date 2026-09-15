import type { IconProps } from './IconProps'

/** Šipka zpět — Btn / Back z § Pokladna · provoz a doklady. */
export function IconChevronLeft({ size = 20, ...rest }: IconProps) {
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
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  )
}

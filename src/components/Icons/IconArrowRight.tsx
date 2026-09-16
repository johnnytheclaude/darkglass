import type { IconProps } from './IconProps'

/** Šipka vpřed s dříkem — hlavní akce průvodců (§ Navigace · rozšíření). */
export function IconArrowRight({ size = 20, ...rest }: IconProps) {
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
      <path d="M4 10h11.5" />
      <path d="M10.5 4.5 16 10l-5.5 5.5" />
    </svg>
  )
}

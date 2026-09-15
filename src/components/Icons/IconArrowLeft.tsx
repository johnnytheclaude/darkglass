import type { IconProps } from './IconProps'

/** Šipka zpět s dříkem — Page Header z § Navigace · rozšíření. */
export function IconArrowLeft({ size = 20, ...rest }: IconProps) {
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
      <path d="M16 10H4.5" />
      <path d="M9.5 4.5 4 10l5.5 5.5" />
    </svg>
  )
}

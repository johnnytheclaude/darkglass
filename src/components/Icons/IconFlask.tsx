import type { IconProps } from './IconProps'

/** Baňka — zkušební režim (pruh SANDBOX, artboard 30 Pokladny). */
export function IconFlask({ size = 18, ...rest }: IconProps) {
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
      <path d="M8.25 2.75v6.2a2 2 0 0 1-.27 1L4.1 16.6a1.25 1.25 0 0 0 1.08 1.9h9.64a1.25 1.25 0 0 0 1.08-1.9l-3.88-6.65a2 2 0 0 1-.27-1V2.75" />
      <path d="M7 2.75h6" />
      <path d="M6 14.25h8" />
    </svg>
  )
}

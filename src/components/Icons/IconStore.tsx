import type { IconProps } from './IconProps'

export function IconStore({ size = 18, ...rest }: IconProps) {
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
      <path d="M3.2 8.1V16a1 1 0 0 0 1 1h11.6a1 1 0 0 0 1-1V8.1" />
      <path d="M2.6 8.1a2 2 0 0 0 3.5-1.3 2 2 0 0 0 3.9 0 2 2 0 0 0 3.9 0 2 2 0 0 0 3.5 1.3" />
      <path d="M4.6 3h10.8l1.9 3.8H2.7Z" />
      <path d="M7.8 17v-4.2h4.4V17" />
    </svg>
  )
}

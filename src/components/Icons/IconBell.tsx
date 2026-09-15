import type { IconProps } from './IconProps'

export function IconBell({ size = 18, ...rest }: IconProps) {
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
      <path d="M10 2.6a4.7 4.7 0 0 0-4.7 4.7c0 3.2-1 4.4-1.6 5.1-.3.3-.1.9.4.9h11.8c.5 0 .7-.6.4-.9-.6-.7-1.6-1.9-1.6-5.1A4.7 4.7 0 0 0 10 2.6Z" />
      <path d="M8.2 16.1a2 2 0 0 0 3.6 0" />
    </svg>
  )
}

import type { IconProps } from './IconProps'

export function IconCamera({ size = 18, ...rest }: IconProps) {
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
      <path d="M2.8 6.9c0-.8.6-1.4 1.4-1.4h1.6l1-1.7h4.4l1 1.7h1.6c.8 0 1.4.6 1.4 1.4v7c0 .8-.6 1.4-1.4 1.4H4.2c-.8 0-1.4-.6-1.4-1.4Z" />
      <circle cx="10" cy="10.4" r="2.8" />
    </svg>
  )
}

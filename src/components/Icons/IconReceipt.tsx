import type { IconProps } from './IconProps'

export function IconReceipt({ size = 18, ...rest }: IconProps) {
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
      <path d="M4.5 2.6h11v14.8l-2.2-1.4-2.15 1.4L9 16l-2.15 1.4L4.5 16Z" />
      <path d="M7.3 6.4h5.4" />
      <path d="M7.3 9.6h5.4" />
      <path d="M7.3 12.8h3.2" />
    </svg>
  )
}

import type { IconProps } from './IconProps'

export function IconFile({ size = 18, ...rest }: IconProps) {
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
      <path d="M11.5 2.5H6.25A2.25 2.25 0 0 0 4 4.75v10.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 16 15.25V7l-4.5-4.5Z" />
      <path d="M11.25 2.75V7H15.5" />
    </svg>
  )
}

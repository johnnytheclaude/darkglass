import type { IconProps } from './IconProps'

export function IconDownload({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M12 4.5V16M7.5 11.5 12 16l4.5-4.5" />
      <path d="M4.5 15.5v2.75A2.25 2.25 0 0 0 6.75 20.5h10.5a2.25 2.25 0 0 0 2.25-2.25V15.5" />
    </svg>
  )
}
